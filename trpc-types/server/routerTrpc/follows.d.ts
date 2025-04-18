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
            createdAt: Date;
            updatedAt: Date;
            type: number;
            content: string;
            isArchived: boolean;
            isRecycle: boolean;
            isShare: boolean;
            isTop: boolean;
            isReviewed: boolean;
            sharePassword: string;
            accountId: number | null;
            shareEncryptedUrl?: string | null | undefined;
            shareExpiryDate?: Date | null | undefined;
            shareMaxView?: number | null | undefined;
            shareViewCount?: number | null | undefined;
            metadata?: any;
            attachments?: {
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
                size: string | number | import("@prisma/client/runtime/library").Decimal;
                perfixPath?: any;
                depth?: any;
            }[] | undefined;
            tags?: ({
                id: number;
                tag: {
                    name: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    icon: string;
                    parent: number;
                    sortOrder: number;
                };
                noteId: number;
                tagId: number;
            } | undefined)[] | null | undefined;
            account?: {
                name?: string | undefined;
                id?: number | undefined;
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
            siteName: string;
            siteUrl: string;
            siteAvatar: string;
            mySiteAccountId: number;
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
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
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
            createdAt: Date;
            updatedAt: Date;
            accountId: number;
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
