import { Prisma } from '@prisma/client';
export interface AttachmentResult {
    id: number | null;
    path: string;
    name: string;
    size: string | null;
    type: string | null;
    isShare: boolean;
    sharePassword: string;
    noteId: number | null;
    sortOrder: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    isFolder: boolean;
    folderName: string | null;
}
export declare const attachmentsRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            size?: number | undefined;
            page?: number | undefined;
            searchText?: string | undefined;
            folder?: string | undefined;
        };
        output: AttachmentResult[];
    }>;
    rename: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            newName: string;
            id?: number | undefined;
            isFolder?: boolean | undefined;
            oldFolderPath?: string | undefined;
        };
        output: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: string;
            isShare: boolean;
            sharePassword: string;
            accountId: number | null;
            sortOrder: number;
            noteId: number | null;
            path: string;
            size: Prisma.Decimal;
            perfixPath: string | null;
            depth: number | null;
        } | {
            success: boolean;
        };
    }>;
    move: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            sourceIds: number[];
            targetFolder: string;
        };
        output: {
            success: boolean;
            message: string;
        };
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id?: number | null | undefined;
            isFolder?: boolean | undefined;
            folderPath?: string | undefined;
        };
        output: {
            success: boolean;
            message: string;
        };
    }>;
    deleteMany: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            ids: number[];
        };
        output: {
            success: boolean;
            message: string;
        };
    }>;
}>>;
