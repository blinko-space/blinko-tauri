import Bowser from 'bowser';
import { getToken } from "@/lib/helper";
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import jwt from 'jsonwebtoken';

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
}

export async function createContext({
  req,
  res,
}: CreateFastifyContextOptions) {
  const token = await getToken(req) as User;
  const ua = req.headers['user-agent'];
  const userAgent = ua ? Bowser.parse(ua) : null;
  if (!token?.sub) {
    return { userAgent } as User;
  }
  return { ...token, id: token.sub, ip: '0.0.0.0', userAgent }
}

export type Context = Awaited<ReturnType<typeof createContext>>;