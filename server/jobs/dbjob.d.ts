import { Context } from "../context";
import { BaseScheduleJob } from "./baseScheduleJob";
import { RestoreResult } from '@shared/lib/types';
export type ExportTimeRange = 'day' | 'week' | 'month' | 'quarter';
export declare class DBJob extends BaseScheduleJob {
    protected static taskName: string;
    protected static job: import("cron").CronJob<null, null>;
    protected static RunTask(): Promise<{
        filePath: string;
        progress: any;
    }>;
    static RestoreDB(filePath: string, ctx: Context): AsyncGenerator<RestoreResult & {
        progress: {
            current: number;
            total: number;
        };
    }, void, unknown>;
    static ExporMDFiles(params: {
        baseURL: string;
        startDate?: Date;
        endDate?: Date;
        ctx: Context;
        format: 'markdown' | 'csv' | 'json';
    }): Promise<{
        success: boolean;
        path: string;
        fileCount: number;
    }>;
}
