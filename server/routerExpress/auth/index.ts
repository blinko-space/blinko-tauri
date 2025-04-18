import express from 'express';
import passport from './config';
import { prisma } from '../../prisma';
import { authenticator } from 'otplib';
import { getGlobalConfig } from '../../routerTrpc/config';
import { verifyToken } from '../../lib/helper';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/csrf-token', (req: any, res) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = uuidv4();
    req.session.save((err) => {
      if (err) {
        console.error('Failed to save CSRF token:', err);
      }
    });
  }
  res.json({ csrfToken: req.session.csrfToken });
});

function handleOAuthCallback(req: any, res: any, err: any, user: any, info: any) {
  console.log('handleOAuthCallback!!!!!!!!!!!!!!!!!!!!', err, user, info);
  if (err) {
    console.error('OAuth authentication error:', err);
    return res.redirect(`/oauth-callback?error=${encodeURIComponent(err.message || 'Authentication failed')}`);
  }

  if (!user) {
    if (info && info.requiresTwoFactor) {
      req.session.twoFactorUserId = info.userId;
      req.session.save((err: any) => {
        if (err) console.error('Session save error:', err);
        return res.redirect(`/oauth-callback?requiresTwoFactor=true&userId=${info.userId}`);
      });
      return;
    }
    return res.redirect(`/oauth-callback?error=${encodeURIComponent(info?.message || 'Authentication failed')}`);
  }

  req.login(user, (loginErr: any) => {
    if (loginErr) {
      console.error('OAuth login error:', loginErr);
      return res.redirect(`/oauth-callback?error=${encodeURIComponent(loginErr.message || 'Error during login')}`);
    }

    if (req.session) {
      req.session.csrfToken = uuidv4();
      req.session.save((err: any) => {
        if (err) {
          console.error('Session save error:', err);
        }
        return res.redirect('/oauth-callback?success=true');
      });
    } else {
      return res.redirect('/oauth-callback?success=true');
    }
  });
}

const logOAuthRequest = (provider: string) => (req: any, res: any, next: any) => {
  console.log(`OAuth ${provider} authentication request:`, {
    url: req.url,
    session: !!req.session,
    headers: req.headers['user-agent']
  });
  next();
};

router.get('/github', logOAuthRequest('GitHub'), (req, res, next) => {
  console.log('GitHub authentication route accessed');
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

router.get('/callback/:providerId', (req, res, next) => {
  const providerId = req.params.providerId;
  console.log(`${providerId} callback route accessed`);
  passport.authenticate(providerId, (err, user, info) => {
    handleOAuthCallback(req, res, err, user, info);
  })(req, res, next);
});

router.get('/google', logOAuthRequest('Google'), (req, res, next) => {
  console.log('Google authentication route accessed');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/facebook', logOAuthRequest('Facebook'), passport.authenticate('facebook', { scope: ['email'] }));

router.get('/twitter', logOAuthRequest('Twitter'), passport.authenticate('twitter'));

router.get('/discord', logOAuthRequest('Discord'), passport.authenticate('discord', { scope: ['identify', 'email'] }));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      if (info.requiresTwoFactor) {
        if (req.session) {
          req.session.twoFactorUserId = info.userId;
          req.session.save((err) => {
            if (err) {
              console.error('Failed to save two-factor ID:', err);
              return res.status(500).json({ error: 'Session save failed' });
            }

            return res.status(200).json({
              requiresTwoFactor: true,
              userId: info.userId,
            });
          });
        } else {
          return res.status(200).json({
            requiresTwoFactor: true,
            userId: info.userId,
          });
        }
        return;
      }
      return res.status(401).json({ error: info.message || 'Authentication failed' });
    }

    try {
      req.login(user, async (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ error: 'Login error' });
        }

        if (req.session) {
          req.session.csrfToken = uuidv4();

          req.session.save((err) => {
            if (err) {
              console.error('Session save error:', err);
              return res.status(500).json({ error: 'Session save error' });
            }

            if (!req.headers.cookie?.includes('connect.sid')) {
              res.cookie('connect.sid', req.sessionID, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
              });
            }

            console.log('Login successful, session set:', {
              sessionID: req.sessionID,
              hasSession: !!req.session,
              cookie: req.headers.cookie,
              user: user.id
            });

            return res.json({
              user: {
                id: user.id,
                name: user.name,
                role: user.role,
                nickname: user.nickname,
                image: user.image,
              },
              csrfToken: req.session?.csrfToken,
            });
          });
        } else {
          console.error('Session unavailable');
          return res.status(500).json({ error: 'Session unavailable' });
        }
      });
    } catch (error) {
      console.error('Session error:', error);
      return res.status(500).json({ error: 'Session error' });
    }
  })(req, res, next);
});

router.post('/verify-2fa', async (req: any, res) => {
  try {
    const userId = req.session?.twoFactorUserId || req.body.userId;

    if (!userId || !req.body.code) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const user = await prisma.accounts.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
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

    const isValidToken = authenticator.verify({
      token: req.body.code,
      secret: config.twoFactorSecret ?? '',
    });

    if (!isValidToken) {
      return res.status(401).json({ error: 'Invalid verification code' });
    }

    req.login(user, (loginErr: any) => {
      if (loginErr) {
        return res.status(500).json({ error: 'Login error' });
      }

      if (req.session) {
        delete req.session.twoFactorUserId;
        req.session.csrfToken = uuidv4();

        req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
            return res.status(500).json({ error: 'Session save error' });
          }

          if (!req.headers.cookie?.includes('connect.sid')) {
            res.cookie('connect.sid', req.sessionID, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 30 * 24 * 60 * 60 * 1000,
              path: '/'
            });
          }

          console.log('2FA verification successful, session set:', {
            sessionID: req.sessionID,
            hasSession: !!req.session,
            cookie: req.headers.cookie,
            user: user.id
          });

          return res.json({
            user: {
              id: user.id,
              name: user.name,
              role: user.role,
              nickname: user.nickname,
              image: user.image,
            },
            csrfToken: req.session?.csrfToken,
          });
        });
      } else {
        console.error('Session unavailable');
        return res.status(500).json({ error: 'Session unavailable' });
      }
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
});

router.get('/profile', (req: any, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  console.log('Profile access, session info:', {
    sessionID: req.sessionID,
    hasSession: !!req.session,
    cookie: req.headers.cookie,
    user: req.user?.id
  });

  const user = req.user;
  res.json({
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      nickname: user.nickname,
      image: user.image,
    },
    csrfToken: req.session?.csrfToken,
  });
});

router.post('/logout', (req: any, res) => {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }

    if (req.session) {
      req.session.destroy((sessionErr: any) => {
        if (sessionErr) {
          console.error('Session destroy error:', sessionErr);
        }
        res.clearCookie('connect.sid', { path: '/' });
        res.json({ message: 'Logout successful' });
      });
    } else {
      res.clearCookie('connect.sid', { path: '/' });
      res.json({ message: 'Logout successful' });
    }
  });
});

router.get('/validate-token', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false, error: 'Token not provided' });
    }

    const token = authHeader.substring(7);
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

    return res.json({ valid: true, user: decoded });
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({ valid: false, error: 'Validation failed' });
  }
});

export default router; 