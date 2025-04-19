import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Context } from '@server/context';
/**
 * Creates a fetch function that uses the configured HTTP proxy
 * @param options
 * @returns A fetch function that works with the proxy settings
 */
export declare function fetchWithProxy(): Promise<typeof fetch>;
/**
 * create axios instance with proxy
 * @param options
 * @returns
 */
export declare function createAxiosWithProxy(options?: {
    ctx?: Context;
    useAdmin?: boolean;
    baseConfig?: AxiosRequestConfig;
}): Promise<AxiosInstance>;
export declare function getWithProxy(url: string, options?: {
    ctx?: Context;
    useAdmin?: boolean;
    config?: AxiosRequestConfig;
}): Promise<import("axios").AxiosResponse<any, any> | {
    error: boolean;
    data: null;
    status: any;
    statusText: any;
    message: any;
    proxyInfo: any;
    url: string;
}>;
export declare function postWithProxy(url: string, data?: any, options?: {
    ctx?: Context;
    useAdmin?: boolean;
    config?: AxiosRequestConfig;
}): Promise<import("axios").AxiosResponse<any, any> | {
    error: boolean;
    data: null;
    status: any;
    statusText: any;
    message: any;
    proxyInfo: any;
    url: string;
}>;
export declare function getProxyUrl(options?: {
    ctx?: Context;
    useAdmin?: boolean;
}): Promise<string | null>;
export declare function getHttpCacheKey(options?: {
    ctx?: Context;
    useAdmin?: boolean;
}): Promise<string>;
