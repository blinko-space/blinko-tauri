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
            page?: number | undefined;
            size?: number | undefined;
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
            id: number;
            type: string;
            isShare: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            noteId: number | null;
            sortOrder: number;
            path: string;
            size: Prisma.Decimal;
            depth: number | null;
            perfixPath: string | null;
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
