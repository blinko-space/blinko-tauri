export declare const pluginRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    getAllPlugins: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            name: string;
            url: string;
            version: string;
            author: string;
            minAppVersion: string;
            downloads: number;
            description?: any;
            displayName?: any;
            readme?: any;
        }[];
    }>;
    getPluginCssContents: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            pluginName: string;
        };
        output: {
            content: string;
            fileName: string;
        }[];
    }>;
    saveDevPlugin: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            code: string;
            fileName: string;
            metadata?: any;
        };
        output: any;
    }>;
    saveAdditionalDevFile: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            content: string;
            filePath: string;
        };
        output: any;
    }>;
    installPlugin: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            url: string;
            version: string;
            author: string;
            minAppVersion: string;
            description?: any;
            displayName?: any;
        };
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            metadata: import("@prisma/client/runtime/library").JsonValue;
            path: string;
            isUse: boolean;
            isDev: boolean;
        };
    }>;
    getInstalledPlugins: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            path: string;
            isUse: boolean;
            isDev: boolean;
            metadata?: any;
        }[];
    }>;
    uninstallPlugin: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: {
            success: boolean;
        };
    }>;
}>>;
