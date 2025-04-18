export declare const tagRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            icon: string;
            parent: number;
            sortOrder: number;
        }[];
    }>;
    fullTagNameById: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: number;
        };
        output: string;
    }>;
    updateTagMany: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            tag: string;
            ids: number[];
        };
        output: boolean;
    }>;
    updateTagName: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            oldName: string;
            newName: string;
        };
        output: boolean;
    }>;
    updateTagIcon: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            icon: string;
        };
        output: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            icon: string;
            parent: number;
            sortOrder: number;
        };
    }>;
    deleteOnlyTag: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: boolean;
    }>;
    deleteTagWithAllNote: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: boolean;
    }>;
    updateTagOrder: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            sortOrder: number;
        };
        output: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            accountId: number | null;
            icon: string;
            parent: number;
            sortOrder: number;
        };
    }>;
}>>;
