import { CronJob } from "cron";
export declare abstract class BaseScheduleJob {
    protected static job: CronJob;
    protected static taskName: string;
    protected static RunTask(): Promise<any>;
    protected static createJob(): CronJob<null, null>;
    static Start(cronTime: string, immediate?: boolean): Promise<{
        name: string;
        output: import("@prisma/client/runtime/library").JsonValue | null;
        isRunning: boolean;
        schedule: string;
        lastRun: Date;
        isSuccess: boolean;
    }>;
    static Stop(): Promise<{
        name: string;
        output: import("@prisma/client/runtime/library").JsonValue | null;
        isRunning: boolean;
        schedule: string;
        lastRun: Date;
        isSuccess: boolean;
    }>;
    static SetCronTime(cronTime: string): Promise<void>;
    protected static autoStart(schedule: string): Promise<void>;
    protected static initializeJob(): Promise<void>;
}
