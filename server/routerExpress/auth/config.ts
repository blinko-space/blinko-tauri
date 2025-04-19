import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { prisma } from '../../prisma';
import { verifyPassword } from '@prisma/seed';
import { getGlobalConfig } from '../../routerTrpc/config';
import { getNextAuthSecret } from '../../lib/helper';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';
import { cache } from '@shared/lib/cache';

// Cache TTL in milliseconds (20 seconds)
const CACHE_TTL = 20 * 1000;

class PrismaSessionStore extends session.Store {
  async get(sid: string, callback: (err: any, session?: any) => void) {
    try {
      const sessionData = await prisma.session.findUnique({
        where: { sid },
      });

      if (!sessionData) {
        return callback(null);
      }

      if (sessionData.expiresAt < new Date()) {
        await this.destroy(sid);
        return callback(null);
      }

      return callback(null, JSON.parse(sessionData.data));
    } catch (error) {
      return callback(error);
    }
  }

  async set(sid: string, session: any, callback?: (err?: any) => void) {
    try {
      const expiresAt = new Date(session.cookie.expires || Date.now() + 86400000);
      const data = JSON.stringify(session);

      await prisma.session.upsert({
        where: { sid },
        update: {
          data,
          expiresAt,
          updatedAt: new Date(),
        },
        create: {
          id: uuidv4(),
          sid,
          data,
          expiresAt,
        },
      });

      callback && callback();
    } catch (error) {
      callback && callback(error);
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      await prisma.session.delete({
        where: { sid },
      }).catch(() => { });

      callback && callback();
    } catch (error) {
      callback && callback(error);
    }
  }

  async touch(sid: string, session: any, callback?: (err?: any) => void) {
    try {
      const expiresAt = new Date(session.cookie.expires || Date.now() + 86400000);

      await prisma.session.update({
        where: { sid },
        data: {
          expiresAt,
          updatedAt: new Date(),
        },
      }).catch(() => { });

      callback && callback();
    } catch (error) {
      callback && callback(error);
    }
  }

  async clear() {
    try {
      const now = new Date();
      await prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: now,
          },
        },
      });

      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      await prisma.session.deleteMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo,
          },
        },
      });

      const sessionCount = await prisma.session.count();
      if (sessionCount > 10000) {
        const sessionsToKeep = await prisma.session.findMany({
          select: { id: true },
          orderBy: { updatedAt: 'desc' },
          take: 10000,
        });

        const keepIds = sessionsToKeep.map(s => s.id);

        await prisma.session.deleteMany({
          where: {
            id: {
              notIn: keepIds,
            },
          },
        });
      }
    } catch (error) {
      console.error('clear session error:', error);
    }
  }
}

export const configureSession = async (app: any) => {
  const secretKey = await getNextAuthSecret();

  app.use(cookieParser(secretKey));

  const sessionStore = new PrismaSessionStore();

  const sessionConfig: session.SessionOptions = {
    name: 'connect.sid',
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'lax'
    },
    genid: () => uuidv4(),
  };

  app.use(session(sessionConfig));

  app.use((req: any, res: any, next: any) => {
    if (req.method === 'GET') {
      return next();
    }

    const csrfToken = req.headers['x-csrf-token'] || req?.body?._csrf;
    const sessionToken = req.session?.csrfToken;

    if (!sessionToken) {
      req.session.csrfToken = uuidv4();
      req.session.save();
    } else if (csrfToken && csrfToken !== sessionToken) {
      return res.status(403).json({ error: 'CSRF token mismatch' });
    }

    next();
  });

  app.use((req: any, res: any, next: any) => {
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await cache.wrap(`user_by_id_${id}`, async () => {
      return await prisma.accounts.findUnique({
        where: { id: Number(id) },
      });
    }, { ttl: CACHE_TTL });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

async function handleOAuthCallback(accessToken: string, refreshToken: string, profile: any, done: any) {
  try {
    let userName = profile.username || profile.displayName || profile.id.toString();

    let existingUser = await prisma.accounts.findFirst({
      where: {
        name: userName,
        loginType: 'oauth'
      }
    });

    if (!existingUser) {
      const newUser = await prisma.accounts.create({
        data: {
          name: userName,
          nickname: userName,
          image: profile.photos?.[0]?.value || '',
          role: 'user',
          loginType: 'oauth',
        }
      });

      cache.set(`user_by_id_${newUser.id}`, null);

      return done(null, newUser);
    } else {
      let realUser = existingUser;
      if (existingUser.linkAccountId) {
        realUser = await cache.wrap(`linked_account_${existingUser.linkAccountId}`, async () => {
          return (await prisma.accounts.findFirst({ where: { id: existingUser.linkAccountId! } }))!;
        }, { ttl: CACHE_TTL });
      }

      await prisma.accounts.update({
        where: { id: existingUser.id },
        data: {
          image: profile.photos?.[0]?.value || existingUser.image,
          updatedAt: new Date()
        }
      });

      cache.set(`user_by_id_${existingUser.id}`, null);

      const config = await getGlobalConfig({
        ctx: {
          id: realUser.id.toString(),
          role: realUser.role as 'superadmin' | 'user',
          name: realUser.name,
          sub: realUser.id.toString(),
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 * 1000,
          iat: Math.floor(Date.now() / 1000),
        },
      });

      if (config.twoFactorEnabled) {
        return done(null, false, { requiresTwoFactor: true, userId: realUser.id });
      }

      return done(null, realUser);
    }
  } catch (error) {
    console.error('OAuth认证错误:', error);
    return done(error);
  }
}

const initJwtStrategy = async () => {
  const secretKey = await getNextAuthSecret();

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    passReqToCallback: true,
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (req, jwtPayload, done) => {
      try {
        if (jwtPayload.exp < Math.floor(Date.now() / 1000)) {
          return done(null, false, { message: 'Token expired' });
        }

        const user = await cache.wrap(`user_by_id_${jwtPayload.sub}`, async () => {
          return await prisma.accounts.findUnique({
            where: { id: Number(jwtPayload.sub) },
          });
        }, { ttl: CACHE_TTL });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        if (!jwtPayload.twoFactorVerified) {
          const config = await getGlobalConfig({
            ctx: {
              id: user.id.toString(),
              role: user.role as 'superadmin' | 'user',
              name: user.name,
              sub: user.id.toString(),
              exp: jwtPayload.exp,
              iat: jwtPayload.iat,
            },
          });

          if (config.twoFactorEnabled) {
            return done(null, false, { requiresTwoFactor: true, userId: user.id });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

const initLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const users = await cache.wrap(`users_by_name_${username}`, async () => {
            return await prisma.accounts.findMany({
              where: { name: username },
            });
          }, { ttl: CACHE_TTL });

          if (users.length === 0) {
            return done(null, false, { message: 'User not found' });
          }

          const correctUsers = await Promise.all(
            users.map(async (user) => {
              if (await verifyPassword(password, user.password ?? '')) {
                return user;
              }
            })
          );

          const user = correctUsers.find((u) => u !== undefined);

          if (!user) {
            return done(null, false, { message: 'Incorrect password' });
          }

          const config = await getGlobalConfig({
            ctx: {
              id: user.id.toString(),
              role: user.role as 'superadmin' | 'user',
              name: user.name,
              sub: user.id.toString(),
              exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 * 1000,
              iat: Math.floor(Date.now() / 1000),
            },
          });

          if (config.twoFactorEnabled) {
            return done(null, false, { requiresTwoFactor: true, userId: user.id });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const initOAuthStrategies = async () => {
  try {
    const config = await getGlobalConfig({ useAdmin: true });
    const providers = config.oauth2Providers || [];

    for (const provider of providers) {
      const callbackURL = `/api/auth/callback/${provider.id}`;
      switch (provider.id) {
        case 'github':
          passport.use(new GitHubStrategy({
            clientID: provider.clientId,
            clientSecret: provider.clientSecret,
            callbackURL: callbackURL
          }, handleOAuthCallback));
          break;

        case 'google':
          passport.use(new GoogleStrategy({
            clientID: provider.clientId,
            clientSecret: provider.clientSecret,
            callbackURL: callbackURL
          }, handleOAuthCallback));
          break;

        case 'facebook':
          passport.use(new FacebookStrategy({
            clientID: provider.clientId,
            clientSecret: provider.clientSecret,
            callbackURL: callbackURL,
            profileFields: ['id', 'displayName', 'photos', 'email']
          }, handleOAuthCallback));
          break;

        case 'twitter':
          passport.use(new TwitterStrategy({
            consumerKey: provider.clientId,
            consumerSecret: provider.clientSecret,
            callbackURL: callbackURL,
            includeEmail: true
          }, handleOAuthCallback));
          break;

        case 'discord':
          passport.use(new DiscordStrategy({
            clientID: provider.clientId,
            clientSecret: provider.clientSecret,
            callbackURL: callbackURL,
            scope: ['identify', 'email']
          }, handleOAuthCallback));
          break;

        // Additional OAuth providers
        case 'spotify':
          try {
            const SpotifyStrategy = require('passport-spotify').Strategy;
            passport.use(new SpotifyStrategy({
              clientID: provider.clientId,
              clientSecret: provider.clientSecret,
              callbackURL: callbackURL,
              scope: ['user-read-email', 'user-read-private']
            }, handleOAuthCallback));
          } catch (error) {
            console.error('Spotify strategy requires passport-spotify package');
          }
          break;

        case 'apple':
          try {
            const AppleStrategy = require('passport-apple');
            passport.use(new AppleStrategy({
              clientID: provider.clientId,
              clientSecret: provider.clientSecret,
              callbackURL: callbackURL,
              scope: ['name', 'email']
            }, handleOAuthCallback));
          } catch (error) {
            console.error('Apple strategy requires passport-apple package');
          }
          break;

        case 'slack':
          try {
            const SlackStrategy = require('passport-slack').Strategy;
            passport.use(new SlackStrategy({
              clientID: provider.clientId,
              clientSecret: provider.clientSecret,
              callbackURL: callbackURL,
              scope: ['identity.basic', 'identity.email']
            }, handleOAuthCallback));
          } catch (error) {
            console.error('Slack strategy requires passport-slack package');
          }
          break;

        case 'twitch':
          try {
            const TwitchStrategy = require('passport-twitch-new').Strategy;
            passport.use(new TwitchStrategy({
              clientID: provider.clientId,
              clientSecret: provider.clientSecret,
              callbackURL: callbackURL,
              scope: 'user:read:email'
            }, handleOAuthCallback));
          } catch (error) {
            console.error('Twitch strategy requires passport-twitch-new package');
          }
          break;

        case 'line':
          try {
            const LineStrategy = require('passport-line').Strategy;
            passport.use(new LineStrategy({
              channelID: provider.clientId,
              channelSecret: provider.clientSecret,
              callbackURL: callbackURL,
              scope: ['profile', 'openid', 'email']
            }, handleOAuthCallback));
          } catch (error) {
            console.error('Line strategy requires passport-line package');
          }
          break;

        default:
          // Custom OAuth provider configuration
          if (provider.wellKnown || (provider.authorizationUrl && provider.tokenUrl)) {
            console.log(`Custom OAuth provider ${provider.id} needs additional configuration`);
            try {
              const { Strategy: OAuth2Strategy } = require('passport-oauth2');

              const oauthConfig = {
                authorizationURL: provider.authorizationUrl || provider.wellKnown + '/authorize',
                tokenURL: provider.tokenUrl || provider.wellKnown + '/token',
                clientID: provider.clientId,
                clientSecret: provider.clientSecret,
                callbackURL: callbackURL,
                scope: provider.scope?.split(' ') || ['profile', 'email'],
                passReqToCallback: true
              };

              passport.use(provider.id, new OAuth2Strategy(oauthConfig,
                (req, accessToken, refreshToken, profile, done) => {
                  if (provider.userinfoUrl) {
                    handleOAuthCallback(accessToken, refreshToken, profile, done);
                  } else {
                    handleOAuthCallback(accessToken, refreshToken, profile, done);
                  }
                }
              ));
            } catch (error) {
              console.error(`Failed to initialize custom OAuth provider: ${provider.id}`, error);
            }
          }
          break;
      }
    }
  } catch (error) {
    console.error('Failed to initialize OAuth strategies:', error);
  }
};

const initStrategies = async () => {
  await initJwtStrategy();
  initLocalStrategy();
  await initOAuthStrategies();
};

initStrategies().catch(err => {
  console.error('Failed to initialize authentication strategies:', err);
});

export default passport; 