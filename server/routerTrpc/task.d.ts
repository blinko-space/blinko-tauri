import '@server/jobs/recommandJob';
export declare const taskRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            name: string;
            isRunning: boolean;
            schedule: string;
            lastRun: Date;
            isSuccess: boolean;
            output?: any;
        }[];
    }>;
    upsertTask: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            type: "update" | "stop" | "start";
            task: "Auto Archive Blinko" | "Backup Database";
            time?: string | undefined;
        };
        output: any;
    }>;
    importFromBlinko: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            filePath: string;
        };
        output: AsyncGenerator<import("@shared/lib/types").RestoreResult & {
            progress: {
                current: number;
                total: number;
            };
        }, void, unknown>;
    }>;
    importFromMemos: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            filePath: string;
        };
        output: AsyncGenerator<import("@shared/lib/types").ProgressResult & {
            progress?: {
                current: number;
                total: number;
            };
        }, void, unknown>;
    }>;
    exportMarkdown: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            format: "json" | "markdown" | "csv";
            baseURL: string;
            startDate?: Date | undefined;
            endDate?: Date | undefined;
        };
        output: {
            success: boolean;
            error?: string | undefined;
            downloadUrl?: string | undefined;
            fileCount?: number | undefined;
        };
    }>;
}>>;
