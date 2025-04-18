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
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
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
            page?: number | undefined;
            size?: number | undefined;
        };
        output: {
            id: number;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
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
                content: string;
                metadata: import("@prisma/client/runtime/library").JsonValue | null;
                createdAt: Date;
                updatedAt: Date;
                role: string;
                conversationId: number;
            }[];
        } & {
            id: number;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
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
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            id: number;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
    }>;
}>>;
