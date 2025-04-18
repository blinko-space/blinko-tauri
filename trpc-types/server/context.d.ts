import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import session from 'express-session';
declare module 'express' {
    interface Request {
        user?: any;
        session?: session.Session & {
            passport?: {
                user: number | string;
            };
            csrfToken?: string;
            twoFactorUserId?: number | string;
        };
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
}
export declare function createContext(req: Request, res: Response): Promise<User>;
export type Context = Awaited<ReturnType<typeof createContext>>;
