import { BaseScheduleJob } from "./baseScheduleJob";
export declare const REBUILD_EMBEDDING_TASK_NAME = "rebuildEmbedding";
export interface ResultRecord {
    type: 'success' | 'skip' | 'error';
    content: string;
    error?: string;
    timestamp: string;
}
export interface RebuildProgress {
    current: number;
    total: number;
    percentage: number;
    isRunning: boolean;
    results: ResultRecord[];
    lastUpdate: string;
}
export declare class RebuildEmbeddingJob extends BaseScheduleJob {
    protected static taskName: string;
    protected static job: import("cron").CronJob<null, null>;
    private static forceStopFlag;
    /**
     * Force restart the rebuild embedding task
     */
    static ForceRebuild(force?: boolean): Promise<boolean>;
    /**
     * Stop the current rebuild task if it's running
     */
    static StopRebuild(): Promise<boolean>;
    /**
     * Get current progress of the rebuild embedding task
     */
    static GetProgress(): Promise<RebuildProgress | null>;
    protected static RunTask(): Promise<any>;
}
