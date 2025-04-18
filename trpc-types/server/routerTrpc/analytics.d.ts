export declare const analyticsRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    dailyNoteCount: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            date: string;
            count: number;
        }[];
    }>;
    monthlyStats: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            month: string;
        };
        output: {
            noteCount: number;
            totalWords: number;
            maxDailyWords: number;
            activeDays: number;
            tagStats?: {
                count: number;
                tagName: string;
            }[] | undefined;
        };
    }>;
}>>;
