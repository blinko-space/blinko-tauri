import { Prisma } from "@prisma/client";
import { z } from "zod";
export declare const accountsSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    nickname: z.ZodString;
    password: z.ZodString;
    image: z.ZodString;
    apiToken: z.ZodString;
    note: z.ZodNumber;
    role: z.ZodString;
    loginType: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    linkAccountId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type accounts = z.infer<typeof accountsSchema>;
export declare const attachmentsSchema: z.ZodObject<{
    id: z.ZodNumber;
    isShare: z.ZodBoolean;
    sharePassword: z.ZodString;
    name: z.ZodString;
    path: z.ZodString;
    size: z.ZodUnion<[z.ZodType<Prisma.Decimal, z.ZodTypeDef, Prisma.Decimal>, z.ZodNumber, z.ZodString]>;
    noteId: z.ZodNullable<z.ZodNumber>;
    accountId: z.ZodNullable<z.ZodNumber>;
    createdAt: z.ZodDate;
    sortOrder: z.ZodNumber;
    updatedAt: z.ZodDate;
    type: z.ZodString;
    depth: z.ZodAny;
    perfixPath: z.ZodAny;
}, "strip", z.ZodTypeAny, {
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
    size: string | number | Prisma.Decimal;
    perfixPath?: any;
    depth?: any;
}, {
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
    size: string | number | Prisma.Decimal;
    perfixPath?: any;
    depth?: any;
}>;
export type attachments = z.infer<typeof attachmentsSchema>;
export declare const configSchema: z.ZodObject<{
    id: z.ZodNumber;
    key: z.ZodString;
    config: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    id: number;
    key: string;
    config?: any;
}, {
    id: number;
    key: string;
    config?: any;
}>;
export type config = z.infer<typeof configSchema>;
export declare const notesSchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type notes = z.infer<typeof notesSchema>;
export declare const tagSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    icon: z.ZodString;
    parent: z.ZodNumber;
    sortOrder: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    icon: string;
    parent: number;
    sortOrder: number;
}, {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    icon: string;
    parent: number;
    sortOrder: number;
}>;
export type tag = z.infer<typeof tagSchema>;
export declare const tagsToNoteSchema: z.ZodObject<{
    id: z.ZodNumber;
    noteId: z.ZodNumber;
    tagId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    noteId: number;
    tagId: number;
}, {
    id: number;
    noteId: number;
    tagId: number;
}>;
export type tagsToNote = z.infer<typeof tagsToNoteSchema>;
export declare const scheduledTaskSchema: z.ZodObject<{
    name: z.ZodString;
    schedule: z.ZodString;
    lastRun: z.ZodDate;
    isSuccess: z.ZodBoolean;
    isRunning: z.ZodBoolean;
    output: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    name: string;
    schedule: string;
    lastRun: Date;
    isSuccess: boolean;
    isRunning: boolean;
    output?: any;
}, {
    name: string;
    schedule: string;
    lastRun: Date;
    isSuccess: boolean;
    isRunning: boolean;
    output?: any;
}>;
export type scheduledTask = z.infer<typeof scheduledTaskSchema>;
export declare const accountsSelectSchema: z.ZodType<Prisma.accountsSelect>;
export declare const configSelectSchema: z.ZodType<Prisma.configSelect>;
export declare const noteReferenceSchema: z.ZodObject<{
    id: z.ZodNumber;
    fromNoteId: z.ZodNumber;
    toNoteId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    fromNoteId: number;
    toNoteId: number;
}, {
    id: number;
    fromNoteId: number;
    toNoteId: number;
}>;
export declare const commentsSchema: z.ZodObject<{
    id: z.ZodNumber;
    content: z.ZodString;
    accountId: z.ZodNullable<z.ZodNumber>;
    guestName: z.ZodNullable<z.ZodString>;
    guestIP: z.ZodNullable<z.ZodString>;
    guestUA: z.ZodNullable<z.ZodString>;
    noteId: z.ZodNumber;
    parentId: z.ZodNullable<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    accountId: number | null;
    guestName: string | null;
    guestIP: string | null;
    guestUA: string | null;
    noteId: number;
    parentId: number | null;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    accountId: number | null;
    guestName: string | null;
    guestIP: string | null;
    guestUA: string | null;
    noteId: number;
    parentId: number | null;
}>;
export type comments = z.infer<typeof commentsSchema>;
export declare const followsSchema: z.ZodObject<{
    id: z.ZodNumber;
    siteName: z.ZodOptional<z.ZodString>;
    siteUrl: z.ZodString;
    siteAvatar: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    followType: z.ZodString;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    siteUrl: string;
    followType: string;
    description?: string | undefined;
    siteName?: string | undefined;
    siteAvatar?: string | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    siteUrl: string;
    followType: string;
    description?: string | undefined;
    siteName?: string | undefined;
    siteAvatar?: string | undefined;
}>;
export type follows = z.infer<typeof followsSchema>;
export declare const NotificationType: {
    readonly FOLLOW: "follow";
    readonly COMMENT: "comment";
    readonly SYSTEM: "system";
};
export declare const notificationType: z.ZodUnion<[z.ZodEnum<["follow", "comment", "system"]>, z.ZodString]>;
export declare const notificationsSchema: z.ZodObject<{
    id: z.ZodNumber;
    type: z.ZodUnion<[z.ZodEnum<["follow", "comment", "system"]>, z.ZodString]>;
    title: z.ZodString;
    content: z.ZodString;
    metadata: z.ZodAny;
    isRead: z.ZodBoolean;
    accountId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    content: string;
    accountId: number;
    title: string;
    isRead: boolean;
    metadata?: any;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    content: string;
    accountId: number;
    title: string;
    isRead: boolean;
    metadata?: any;
}>;
export type Notifications = z.infer<typeof notificationsSchema>;
export type InputNotificationType = z.infer<typeof notificationType>;
export declare const cacheSchema: z.ZodObject<{
    id: z.ZodNumber;
    key: z.ZodString;
    value: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    id: number;
    key: string;
    value?: any;
}, {
    id: number;
    key: string;
    value?: any;
}>;
export declare const pluginSchema: z.ZodObject<{
    id: z.ZodNumber;
    metadata: z.ZodAny;
    path: z.ZodString;
    isUse: z.ZodBoolean;
    isDev: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    path: string;
    isUse: boolean;
    isDev: boolean;
    metadata?: any;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    path: string;
    isUse: boolean;
    isDev: boolean;
    metadata?: any;
}>;
export type plugin = z.infer<typeof pluginSchema>;
export declare const conversationSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    accountId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    title: string;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    title: string;
}>;
export type conversation = z.infer<typeof conversationSchema>;
export declare const messageSchema: z.ZodObject<{
    id: z.ZodNumber;
    content: z.ZodString;
    role: z.ZodString;
    conversationId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    metadata: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    id: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    conversationId: number;
    metadata?: any;
}, {
    id: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    conversationId: number;
    metadata?: any;
}>;
export type message = z.infer<typeof messageSchema>;
export declare const historySchema: z.ZodObject<{
    id: z.ZodNumber;
    content: z.ZodString;
    noteId: z.ZodNumber;
    createdAt: z.ZodDate;
    version: z.ZodOptional<z.ZodNumber>;
    accountId: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    content: string;
    accountId: number | null;
    noteId: number;
    version?: number | undefined;
}, {
    id: number;
    createdAt: Date;
    content: string;
    accountId: number | null;
    noteId: number;
    version?: number | undefined;
}>;
export type history = z.infer<typeof historySchema>;
export declare const noteInternalShareSchema: z.ZodObject<{
    id: z.ZodNumber;
    noteId: z.ZodNumber;
    accountId: z.ZodNumber;
    canEdit: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    accountId: number;
    noteId: number;
    canEdit: boolean;
}, {
    id: number;
    accountId: number;
    noteId: number;
    canEdit: boolean;
}>;
export type noteInternalShare = z.infer<typeof noteInternalShareSchema>;
