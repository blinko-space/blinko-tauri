export declare const messageRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            content: string;
            role: "user" | "system" | "assistant";
            conversationId: number;
            metadata?: any;
        };
        output: {
            id: number;
            content: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            role: string;
            conversationId: number;
        };
    }>;
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            conversationId: number;
            page?: number | undefined;
            size?: number | undefined;
        };
        output: {
            id: number;
            content: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            role: string;
            conversationId: number;
        }[];
    }>;
    update: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            content: string;
        };
        output: {
            id: number;
            content: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            role: string;
            conversationId: number;
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: void;
    }>;
}>>;
