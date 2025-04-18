export declare const conversationRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            title?: string | undefined;
        };
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
            title: string;
        };
    }>;
    clearMessages: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            success: boolean;
        };
    }>;
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            size?: number | undefined;
            page?: number | undefined;
        };
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
            title: string;
        }[];
    }>;
    detail: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: number;
        };
        output: ({
            messages: {
                id: number;
                role: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                conversationId: number;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
            title: string;
        }) | null;
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            title?: string | undefined;
        };
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
            title: string;
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
            title: string;
        };
    }>;
}>>;
