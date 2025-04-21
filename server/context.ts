import Bowser from 'bowser';
import { getTokenFromRequest } from "@server/lib/helper";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: any;
    isAuthenticated?: () => boolean;
    login?: (user: any, callback?: (err: any) => void) => void;
    logout?: (callback?: (err: any) => void) => void;
  }
}

export interface User extends jwt.JwtPayload {
  name: string;
  sub: string;
  role: string;
  id: string;
  exp: number;
  iat: number;
  ip?: string;
  userAgent?: any;
  permissions?: string[];
  twoFactorVerified?: boolean;
}

export async function createContext(req: Request, res: Response) {
  const headers = req?.headers || {};
  const ua = headers['user-agent'] || '';
  const userAgent = ua ? Bowser.parse(ua) : null;
  
  try {
    const token = await getTokenFromRequest(req as any) as User;
    if (token?.sub) {
      return { ...token, id: token.sub, ip: req?.ip || '0.0.0.0', userAgent } as User;
    }
  } catch (error) {
    console.error('get token error:', error);
  }
  
  return { userAgent } as User;
}

export type Context = Awaited<ReturnType<typeof createContext>>;