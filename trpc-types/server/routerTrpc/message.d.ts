export declare const messageRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            role: "user" | "system" | "assistant";
            content: string;
            conversationId: number;
            metadata?: any;
        };
        output: {
            id: number;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
            conversationId: number;
        };
    }>;
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            conversationId: number;
            size?: number | undefined;
            page?: number | undefined;
        };
        output: {
            id: number;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
            role: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            metadata: import("@prisma/client/runtime/library").JsonValue | null;
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
