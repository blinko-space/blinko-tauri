import { InputNotificationType } from '@shared/lib/prismaZodType';
export declare const CreateNotification: (input: {
    title: string;
    content: string;
    metadata?: any;
    type: InputNotificationType;
    accountId?: number;
    useAdmin?: boolean;
}) => Promise<void>;
export declare const notificationRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: import("../context").User;
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: true;
}, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<{
    list: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            page?: number | undefined;
            size?: number | undefined;
        };
        output: {
            id: number;
            type: string;
            content: string;
            accountId: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            isRead: boolean;
            metadata?: any;
        }[];
    }>;
    create: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            type: string;
            content: string;
            title: string;
            metadata?: any;
        };
        output: boolean;
    }>;
    markAsRead: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id?: number | undefined;
            all?: boolean | undefined;
        };
        output: boolean;
    }>;
    unreadCount: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: number;
    }>;
    delete: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
        };
        output: boolean;
    }>;
}>>;
