export declare const userRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
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
            nickname: string;
            password: string;
            image: string;
            apiToken: string;
            note: number;
            role: string;
            createdAt: Date;
            updatedAt: Date;
            description?: string | undefined;
            loginType?: string | undefined;
            linkAccountId?: number | null | undefined;
        }[];
    }>;
    publicUserList: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            name: string;
            id: number;
            nickname: string;
            image: string | null;
            description: string | null;
            role: string;
            loginType: string;
            linkAccountId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    nativeAccountList: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            name: string;
            id: number;
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
            name: string;
            id: number;
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
            name?: string | undefined;
            id?: number | undefined;
            nickname?: string | undefined;
            password?: string | undefined;
            image?: string | undefined;
            originalPassword?: string | undefined;
        };
        output: any;
    }>;
    upsertUserByAdmin: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name?: string | undefined;
            id?: number | undefined;
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
            name: string;
            id: number;
            nickname: string;
            image: string | null;
            role: string;
            loginType: string;
            token: string;
        };
    }>;
}>>;
