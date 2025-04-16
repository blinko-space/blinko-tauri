import { ExpressAuth } from "@auth/express";
import CredentialsProvider from "@auth/express/providers/credentials";
import GitHubProvider from "@auth/express/providers/github";
import GoogleProvider from "@auth/express/providers/google";
import FacebookProvider from "@auth/express/providers/facebook";
import TwitterProvider from "@auth/express/providers/twitter";
import DiscordProvider from "@auth/express/providers/discord";
import SpotifyProvider from "@auth/express/providers/spotify";
import AppleProvider from "@auth/express/providers/apple";
import SlackProvider from "@auth/express/providers/slack";
import TwitchProvider from "@auth/express/providers/twitch";
import LineProvider from "@auth/express/providers/line";
import { authenticator } from 'otplib';
import { OAuthConfig } from '@auth/core/providers';
import { getGlobalConfig } from "../routerTrpc/config";
import { prisma } from "../prisma";
import { getNextAuthSecret, getSessionToken } from "../lib/helper";
import { verifyPassword } from "@prisma/seed";

async function verify2FACode(userId: string, userRole: string, userName: string, twoFactorCode: string) {
  const now = Math.floor(Date.now() / 1000);
  const thirtyDays = 30 * 24 * 60 * 60;

  const config = await getGlobalConfig({
    ctx: {
      id: userId,
      role: userRole as 'superadmin' | 'user',
      name: userName,
      sub: userId,
      exp: now + thirtyDays,
      iat: now
    }
  });

  const isValidToken = authenticator.verify({
    token: twoFactorCode,
    secret: config.twoFactorSecret ?? ''
  });

  if (!isValidToken) {
    throw new Error("Invalid 2FA code");
  }

  return config;
}

async function getUserConfig(userId: string, userRole: string, userName: string) {
  const now = Math.floor(Date.now() / 1000);
  const thirtyDays = 30 * 24 * 60 * 60;

  return await getGlobalConfig({
    ctx: {
      id: userId,
      role: userRole as 'superadmin' | 'user',
      name: userName,
      sub: userId,
      exp: now + thirtyDays,
      iat: now
    }
  });
}

async function getProviderConfigList() {
  try {
    const config = await getGlobalConfig({ useAdmin: true });
    const providers = config.oauth2Providers || [];

    return providers.map(provider => {
      switch (provider.id) {
        case 'github':
          return GitHubProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'google':
          return GoogleProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'facebook':
          return FacebookProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'twitter':
          return TwitterProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'discord':
          return DiscordProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'spotify':
          return SpotifyProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'apple':
          return AppleProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'slack':
          return SlackProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'twitch':
          return TwitchProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        case 'line':
          return LineProvider({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          });
        default:
          if (provider.wellKnown) {
            return {
              id: provider.id,
              name: provider.name,
              type: "oauth",
              wellKnown: provider.wellKnown,
              clientId: provider.clientId,
              clientSecret: provider.clientSecret,
              profile(profile: any) {
                return {
                  id: profile?.id ?? (profile?.sub ?? (profile?.sid ?? '')),
                  name: profile.name || profile.login,
                  email: profile.email,
                  image: profile.avatar_url || profile.picture
                };
              }
            } as OAuthConfig<any>;
          }
          return {
            id: provider.id,
            name: provider.name,
            type: "oauth",
            authorization: {
              url: provider.authorizationUrl!,
              params: { scope: provider.scope }
            },
            token: {
              url: provider.tokenUrl!,
            },
            userinfo: {
              url: provider.userinfoUrl!,
            },
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
            profile(profile: any) {
              return {
                id: profile?.id ?? (profile?.sub ?? (profile?.sid ?? '')),
                name: profile.name || profile.login,
                email: profile.email,
                image: profile.avatar_url || profile.picture
              };
            }
          } as OAuthConfig<any>;
      }
    });
  } catch (error) {
    console.error("Failed to load OAuth providers:", error);
    return [];
  }
}

export const expressAuthParam = async () => {
  const providers = await getProviderConfigList();
  const secret = await getNextAuthSecret();
  return {
    providers: [
      ...providers,
      CredentialsProvider({
        id: "oauth-2fa",
        name: "OAuth 2FA",
        credentials: {
          name: { label: "Name", type: "text" },
          twoFactorCode: { label: "2FA Code", type: "text" },
        },
        async authorize(credentials) {
          try {
            if (!credentials || !credentials.name || !credentials.twoFactorCode) {
              throw new Error("Missing required credentials");
            }

            const user = await prisma.accounts.findFirst({
              where: { name: credentials.name as string }
            });

            if (!user) {
              throw new Error("User not found");
            }

            await verify2FACode(
              user.id.toString(),
              user.role,
              user.name,
              credentials.twoFactorCode?.toString() ?? ''
            );

            return {
              id: user.id.toString(),
              name: user.name,
              nickname: user.nickname,
              role: user.role,
              image: user.image,
              twoFactorVerified: true
            };
          } catch (error: any) {
            console.error('OAuth 2FA error:', error);
            throw error;
          }
        }
      }),
      CredentialsProvider({
        id: "credentials",
        name: 'Credentials',
        credentials: {
          username: { label: "User", type: "text" },
          password: { label: "Password", type: "password" },
          twoFactorCode: { label: "2FA Code", type: "text" },
          isSecondStep: { label: "Is Second Step", type: "boolean" }
        },
        async authorize(credentials) {
          try {
            if (!credentials || !credentials.username || !credentials.password) {
              console.log('Missing required credentials');
              throw new Error("Missing required credentials");
            }

            const users = await prisma.accounts.findMany({
              where: { name: credentials.username as string },
              select: {
                name: true,
                nickname: true,
                id: true,
                role: true,
                password: true,
              }
            });
            if (users.length === 0) {
              throw new Error("user not found");
            }

            const correctUsers = (await Promise.all(users.map(async (user) => {
              if (await verifyPassword(credentials.password as string, user.password ?? '')) {
                return user;
              }
            }))).filter(user => user !== undefined);

            if (!correctUsers || correctUsers.length === 0) {
              throw new Error("password is incorrect");
            }

            const user = correctUsers[0]!;
            const config = await getUserConfig(
              user.id.toString(),
              user.role,
              user.name
            );

            if (credentials.isSecondStep === 'true') {
              await verify2FACode(
                user.id.toString(),
                user.role,
                user.name,
                credentials.twoFactorCode?.toString() ?? ''
              );

              return {
                id: user.id.toString(),
                name: user.name || '',
                nickname: user.nickname,
                role: user.role
              };
            }

            if (config.twoFactorEnabled) {
              return {
                id: user.id.toString(),
                requiresTwoFactor: true
              };
            }
            console.log({
              id: user.id.toString(),
              name: user.name || '',
              nickname: user.nickname,
              role: user.role,
              requiresTwoFactor: false
            }, 'login success')
            return {
              id: user.id.toString(),
              name: user.name || '',
              nickname: user.nickname,
              role: user.role,
              requiresTwoFactor: false
            };
          } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
          }
        }
      })
    ],
    pages: {
      signIn: '/signin',
      error: '/signin',
    },
    debug: process.env.NODE_ENV !== 'production',
    secret: secret,
    callbacks: {
      async signIn({ user, account }: { user: any; account?: any }) {
        let userName = user.id ?? user.name ?? '';
        if (account?.type === 'oauth') {
          try {
            const existingUser = await prisma.accounts.findFirst({
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
                  image: user.image || '',
                  role: 'user',
                  loginType: 'oauth',
                }
              });
              user.id = newUser.id.toString();
              // @ts-ignore
              user.name = userName;
              // @ts-ignore
              user.role = newUser.role;
              // @ts-ignore
              user.nickname = newUser.nickname;
            } else {
              let realUser = existingUser;
              if (existingUser.linkAccountId) {
                realUser = (await prisma.accounts.findFirst({ where: { id: existingUser.linkAccountId } }))!
                userName = realUser.name;
              }

              const config = await getGlobalConfig({
                ctx: {
                  id: realUser.id.toString(),
                  role: realUser.role as 'superadmin' | 'user',
                  name: userName,
                  sub: realUser.id.toString(),
                  exp: 0,
                  iat: 0
                }
              });

              if (config.twoFactorEnabled) {
                // @ts-ignore
                user.requiresTwoFactor = true;
              }

              await prisma.accounts.update({
                where: { id: existingUser.id },
                data: {
                  image: user.image || existingUser.image,
                  updatedAt: new Date()
                }
              });

              // @ts-ignore
              user.id = realUser.id.toString();
              // @ts-ignore
              user.name = userName;
              // @ts-ignore
              user.role = realUser.role;
              // @ts-ignore
              user.nickname = realUser.nickname;
            }
          } catch (error) {
            console.error('OAuth sign in error:', error);
            return false;
          }
        }
        return true;
      },
      async jwt({ token, user }) {
        console.log(token, 'jwt token')
        if (user) {
          // @ts-ignore
          if (user.requiresTwoFactor) {
            token.requiresTwoFactor = true;
            token.twoFactorVerified = false;
          }
          // @ts-ignore
          token.nickname = user.nickname;
          // @ts-ignore
          token.role = user.role;
          // @ts-ignore
          token.id = user.id;
        }

        // @ts-ignore
        if (token.requiresTwoFactor && user?.twoFactorVerified) {
          token.twoFactorVerified = true;
        }

        return token;
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
      async session({ session, token }) {
        const user = await prisma.accounts.findUnique({
          where: { id: Number(token.id) },
        });

        if (!user) {
          throw new Error('User no longer exists');
        }

        // @ts-ignore
        session.user!.nickname = token.nickname;
        // @ts-ignore
        session.user!.id = token.id;
        // @ts-ignore
        session.user!.role = token.role;
        return {
          ...session,
          // @ts-ignore
          token: token.token,
          // @ts-ignore
          requiresTwoFactor: token.requiresTwoFactor
        };
      },
    },
    session: {
      strategy: "jwt" as const,
      maxAge: 60 * 60 * 24 * 365 * 10,
    },
    jwt: {
      maxAge: 60 * 60 * 24 * 365 * 10,
    },
  }
}

export async function setupAuth(app: any) {
  try {
    if (!process.env.AUTH_URL) {
      process.env.AUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:1111';
    }
    if (!process.env.AUTH_SECRET) {
      process.env.AUTH_SECRET = await getNextAuthSecret();
    }

    app.set('trust proxy', true);

    app.use("/api/auth", ExpressAuth(await expressAuthParam()));

    app.use(async (req: any, res: any, next: any) => {
      try {
        const session = await getSessionToken(req);
        res.locals.session = session;
      } catch (error) {
        console.error("Session fetch error:", error);
        res.locals.session = null;
      }
      next();
    });

    // app.use((req: any, res: any, next: any) => {
    //   req.authMiddleware = async (requireAuth = true) => {
    //     try {
    //       const session = res.locals.session;
    //       if (requireAuth && !session) {
    //         return res.redirect(`/signin?callbackUrl=${encodeURIComponent(req.url)}`);
    //       }
    //       return session;
    //     } catch (error) {
    //       console.error("Auth middleware error:", error);
    //       if (requireAuth) {
    //         return res.redirect(`/signin?callbackUrl=${encodeURIComponent(req.url)}`);
    //       }
    //       return null;
    //     }
    //   };
    //   next();
    // });
  } catch (error) {
    console.error("Auth setup error:", error);
  }
} 