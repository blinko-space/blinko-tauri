export declare const followsRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    recommandList: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            searchText?: string | undefined;
        } | undefined;
        output: {
            id: number;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
            attachments?: {
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
                size: string | number | import("@prisma/client/runtime/library").Decimal;
                depth?: any;
                perfixPath?: any;
            }[] | undefined;
            shareEncryptedUrl?: string | null | undefined;
            shareExpiryDate?: Date | null | undefined;
            shareMaxView?: number | null | undefined;
            shareViewCount?: number | null | undefined;
            metadata?: any;
            tags?: ({
                tag: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                id: number;
                noteId: number;
                tagId: number;
            } | undefined)[] | null | undefined;
            account?: {
                id?: number | undefined;
                name?: string | undefined;
                nickname?: string | undefined;
                image?: string | undefined;
            } | null | undefined;
            _count?: {
                comments: number;
            } | undefined;
            originURL?: string | undefined;
        }[];
    }>;
    follow: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            siteUrl: string;
            mySiteUrl: string;
        };
        output: {
            success: boolean;
            data?: any;
        };
    }>;
    followFrom: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            siteUrl: string;
            mySiteAccountId: number;
            siteName: string;
            siteAvatar: string;
        };
        output: {
            success: boolean;
            data?: any;
        };
    }>;
    unfollow: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            siteUrl: string;
            mySiteUrl: string;
        };
        output: boolean;
    }>;
    unfollowFrom: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            siteUrl: string;
            mySiteAccountId: number;
        };
        output: boolean;
    }>;
    followList: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            userId?: number | null | undefined;
        };
        output: {
            id: number;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
            siteUrl: string;
            followType: string;
            description?: string | undefined;
            siteName?: string | undefined;
            siteAvatar?: string | undefined;
        }[] | undefined;
    }>;
    followerList: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            userId?: number | null | undefined;
        };
        output: {
            id: number;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
            siteUrl: string;
            followType: string;
            description?: string | undefined;
            siteName?: string | undefined;
            siteAvatar?: string | undefined;
        }[] | undefined;
    }>;
    isFollowing: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            siteUrl: string;
        };
        output: {
            data: boolean;
            success: boolean;
        };
    }>;
}>>;
