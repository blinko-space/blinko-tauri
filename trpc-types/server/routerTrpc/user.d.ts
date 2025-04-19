export declare const userRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nickname: string;
            password: string;
            image: string;
            apiToken: string;
            note: number;
            role: string;
            description?: string | undefined;
            loginType?: string | undefined;
            linkAccountId?: number | null | undefined;
        }[];
    }>;
    publicUserList: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            nickname: string;
            image: string | null;
            description: string | null;
            role: string;
            loginType: string;
            linkAccountId: number | null;
        }[];
    }>;
    nativeAccountList: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: number;
            name: string;
            nickname: string;
        }[];
    }>;
    linkAccount: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            originalPassword: string;
        };
        output: boolean;
    }>;
    unlinkAccount: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: boolean;
    }>;
    detail: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id?: number | undefined;
        };
        output: {
            id: number;
            name: string;
            image: string | null;
            role: string;
            loginType: string;
            nickName: string;
            token: string;
            isLinked: boolean;
        };
    }>;
    canRegister: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: boolean;
    }>;
    register: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            password: string;
        };
        output: any;
    }>;
    regenToken: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: boolean;
    }>;
    genLowPermToken: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            token: string;
        };
    }>;
    upsertUser: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id?: number | undefined;
            name?: string | undefined;
            nickname?: string | undefined;
            password?: string | undefined;
            image?: string | undefined;
            originalPassword?: string | undefined;
        };
        output: any;
    }>;
    upsertUserByAdmin: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id?: number | undefined;
            name?: string | undefined;
            nickname?: string | undefined;
            password?: string | undefined;
        };
        output: any;
    }>;
    generate2FASecret: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
        };
        output: {
            secret: string;
            qrCode: string;
        };
    }>;
    verify2FAToken: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            token: string;
            secret: string;
        };
        output: boolean;
    }>;
    deleteUser: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: boolean;
    }>;
    login: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            password: string;
        };
        output: {
            id: number;
            name: string;
            nickname: string;
            image: string | null;
            role: string;
            loginType: string;
            token: string;
        };
    }>;
}>>;
