import { BaseScheduleJob } from "./baseScheduleJob";
import { z } from "zod";
export declare const recommandListSchema: z.ZodArray<z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodNumber;
    type: z.ZodNumber;
    content: z.ZodString;
    isArchived: z.ZodBoolean;
    isRecycle: z.ZodBoolean;
    isShare: z.ZodBoolean;
    isTop: z.ZodBoolean;
    isReviewed: z.ZodBoolean;
    sharePassword: z.ZodString;
    shareEncryptedUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shareExpiryDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    shareMaxView: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    shareViewCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    metadata: z.ZodAny;
    accountId: z.ZodUnion<[z.ZodNumber, z.ZodNull]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, {
    attachments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        isShare: z.ZodBoolean;
        sharePassword: z.ZodString;
        name: z.ZodString;
        path: z.ZodString;
        size: z.ZodUnion<[z.ZodType<import("@prisma/client/runtime/library").Decimal, z.ZodTypeDef, import("@prisma/client/runtime/library").Decimal>, z.ZodNumber, z.ZodString]>;
        noteId: z.ZodNullable<z.ZodNumber>;
        accountId: z.ZodNullable<z.ZodNumber>;
        createdAt: z.ZodDate;
        sortOrder: z.ZodNumber;
        updatedAt: z.ZodDate;
        type: z.ZodString;
        depth: z.ZodAny;
        perfixPath: z.ZodAny;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">>;
    account: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        nickname: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        name?: string | undefined;
        nickname?: string | undefined;
        image?: string | undefined;
    }, {
        id?: number | undefined;
        name?: string | undefined;
        nickname?: string | undefined;
        image?: string | undefined;
    }>>>;
    tags: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodOptional<z.ZodObject<z.objectUtil.extendShape<{
        id: z.ZodNumber;
        noteId: z.ZodNumber;
        tagId: z.ZodNumber;
    }, {
        tag: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            icon: z.ZodString;
            parent: z.ZodNumber;
            sortOrder: z.ZodNumber;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            parent: number;
            sortOrder: number;
        }, {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            icon: string;
            parent: number;
            sortOrder: number;
        }>;
    }>, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>>, "many">>>;
    _count: z.ZodOptional<z.ZodObject<{
        comments: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        comments: number;
    }, {
        comments: number;
    }>>;
    originURL: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, "many">;
export type RecommandListType = z.infer<typeof recommandListSchema>;
export declare class RecommandJob extends BaseScheduleJob {
    protected static taskName: string;
    protected static job: import("cron").CronJob<null, null>;
    private static maxConcurrency;
    private static initializeTask;
    private static batchProcess;
    static RunTask(): Promise<void>;
}
