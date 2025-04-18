import { type Tag } from './types';
export interface TagTreeNode {
    name: string;
    children?: TagTreeNode[];
}
export type TagTreeDBNode = Tag & {
    children?: TagTreeDBNode[];
    metadata: {
        icon: string;
        path: string;
    };
};
export declare const helper: {
    regex: {
        isEndsWithHashTag: RegExp;
        isContainHashTag: RegExp;
    };
    assemblyPageResult<T>(args: {
        data: T[];
        page: number;
        size: number;
        result: T[];
    }): {
        result: T[];
        isLoadAll: boolean;
        isEmpty: boolean;
    };
    extractHashtags(input: string): string[];
    buildHashTagTreeFromHashString(paths: string[]): TagTreeNode[];
    buildHashTagTreeFromDb(tags: Tag[]): TagTreeDBNode[];
    generateTagPaths(node: TagTreeDBNode, parentPath?: string): string[];
    getFileExtension(filename: string): string | null;
    promise: {
        sleep(ms: any): Promise<unknown>;
        runAsync<T, U = Error>(promise: Promise<T>): Promise<[U | null, T | null]>;
    };
    object: {
        crawlObject(object: any, options: any): any;
        crawl(object: any, options: any): any;
    };
    json: {
        isJsonString(str: string): boolean;
        safeParse(val: any): any;
    };
    deepAssign(target: any, ...sources: any[]): any;
    isObject(value: any): boolean;
    download: {
        downloadByBlob(name: string, blob: Blob): void;
        downloadByLink(href: string): void;
    };
    env: {
        isBrowser: boolean;
        isIOS: () => boolean;
    };
};
