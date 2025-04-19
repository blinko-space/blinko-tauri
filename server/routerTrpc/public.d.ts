export declare const publicRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    version: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: string;
    }>;
    oauthProviders: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: string;
            name: string;
            icon?: string | undefined;
        }[];
    }>;
    latestVersion: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: string;
    }>;
    linkPreview: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            url: string;
        };
        output: {
            description: string;
            title: string;
            favicon: string;
        } | null;
    }>;
    testWebhook: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            data?: any;
            webhookType?: string | undefined;
        };
        output: {
            success: boolean;
            data?: any;
        };
    }>;
    musicMetadata: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            filePath: string;
        };
        output: {
            coverUrl?: string | undefined;
            trackName?: string | undefined;
            albumName?: string | undefined;
            artists?: string[] | undefined;
        };
    }>;
    siteInfo: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id?: number | null | undefined;
        } | undefined;
        output: {
            id: number;
            name?: string | undefined;
            image?: string | undefined;
            description?: string | undefined;
            role?: string | undefined;
        };
    }>;
    hubList: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: string;
            name: string;
            image: string;
            description: string;
        }[];
    }>;
    hubSiteList: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            search?: string | undefined;
            refresh?: boolean | undefined;
        };
        output: {
            url: string;
            title: string;
            tags?: string[] | undefined;
            image?: string | null | undefined;
            version?: string | undefined;
            site_description?: string | null | undefined;
        }[];
    }>;
    testHttpProxy: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            url?: string | undefined;
        };
        output: {
            message: string;
            success: boolean;
            responseTime: number;
            error?: string | undefined;
            statusCode?: number | undefined;
            errorCode?: string | undefined;
            errorDetails?: any;
        };
    }>;
}>>;
