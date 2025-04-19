import { LRUCache } from 'lru-cache';
export declare class memoryCache {
    cache: LRUCache<string, {
        value: any;
        expiration: number;
    }>;
    constructor(options?: {});
    get(key: string): {
        value: any;
        expiration: number;
    } | undefined;
    set(key: string, value: any): void;
    clear(): void;
    wrap<T extends (...args: any[]) => Promise<any>, U = ReturnType<T>>(key: string, fn: T, args: {
        ttl: number;
        alowStale?: boolean;
    }): Promise<Awaited<U>>;
}
export declare const cache: memoryCache;
