export declare const pluginRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    getAllPlugins: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            url: string;
            name: string;
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
            url: string;
            name: string;
            version: string;
            author: string;
            minAppVersion: string;
            description?: any;
            displayName?: any;
        };
        output: {
            id: number;
            metadata: import("@prisma/client/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            isDev: boolean;
            path: string;
            isUse: boolean;
        };
    }>;
    getInstalledPlugins: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDev: boolean;
            path: string;
            isUse: boolean;
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
