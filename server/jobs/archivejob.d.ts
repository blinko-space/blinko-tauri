import { BaseScheduleJob } from "./baseScheduleJob";
export declare class ArchiveJob extends BaseScheduleJob {
    protected static taskName: string;
    protected static job: import("cron").CronJob<null, null>;
    protected static RunTask(): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
