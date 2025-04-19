export declare const commentRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            content: string;
            noteId: number;
            guestName?: string | undefined;
            parentId?: number | undefined;
        };
        output: boolean;
    }>;
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            noteId: number;
            orderBy?: "asc" | "desc" | undefined;
            page?: number | undefined;
            size?: number | undefined;
        };
        output: {
            total: number;
            items: any[];
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            success: boolean;
        };
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            content: string;
        };
        output: any;
    }>;
}>>;
