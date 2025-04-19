import { Context } from '../context';
import { ProgressResult } from '@shared/lib/types';
export declare class Memos {
    private db;
    initDB(filePath: string): Promise<string>;
    closeDB(): void;
    importMemosDB(ctx: Context): AsyncGenerator<ProgressResult & {
        progress?: {
            current: number;
            total: number;
        };
    }, void, unknown>;
    importFiles(ctx: Context): AsyncGenerator<ProgressResult & {
        progress?: {
            current: number;
            total: number;
        };
    }, void, unknown>;
}
