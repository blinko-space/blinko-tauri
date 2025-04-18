import { Feed } from "feed";
import { User } from "@server/context";
import { Request as ExpressRequest } from 'express';
export declare const SendWebhook: (data: any, webhookType: string, ctx: {
    id: string;
}) => Promise<void>;
export declare function generateTOTP(): string;
export declare function generateTOTPQRCode(username: string, secret: string): string;
export declare function verifyTOTP(token: string, secret: string): boolean;
export declare function generateFeed(userId: number, origin: string, rows?: number): Promise<Feed>;
export declare const getNextAuthSecret: () => Promise<string>;
export declare const generateToken: (user: any, twoFactorVerified?: boolean) => Promise<string>;
export declare const verifyToken: (token: string) => Promise<User | null>;
export declare const getTokenFromRequest: (req: ExpressRequest) => Promise<User | null>;
export declare const getAllPathTags: () => Promise<string[]>;
export declare const resetSequences: () => Promise<void>;
export declare const getUserFromSession: (req: any) => {
    id: any;
    sub: any;
    name: any;
    role: any;
    exp: number;
    iat: number;
} | null;
export declare const getUserFromRequest: (req: any) => Promise<{
    id: any;
    sub: any;
    name: any;
    role: any;
    exp: number;
    iat: number;
} | null>;
