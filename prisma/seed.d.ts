export declare function hashPassword(password: string): Promise<string>;
export declare function verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean>;
