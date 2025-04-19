import { NoteType } from '@shared/lib/types';
import { z } from 'zod';
export declare const updateBlinkoTool: import("@mastra/core/tools").Tool<z.ZodObject<{
    notes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        content: z.ZodString;
        type: z.ZodDefault<z.ZodUnion<[z.ZodNativeEnum<typeof NoteType>, z.ZodLiteral<-1>]>>;
        isArchived: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        isTop: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        isShare: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        isRecycle: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        type: NoteType | -1;
        content: string;
        isArchived: boolean | null;
        isRecycle: boolean | null;
        isShare: boolean | null;
        isTop: boolean | null;
    }, {
        id: number;
        content: string;
        type?: NoteType | -1 | undefined;
        isArchived?: boolean | null | undefined;
        isRecycle?: boolean | null | undefined;
        isShare?: boolean | null | undefined;
        isTop?: boolean | null | undefined;
    }>, "many">;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    notes: {
        id: number;
        type: NoteType | -1;
        content: string;
        isArchived: boolean | null;
        isRecycle: boolean | null;
        isShare: boolean | null;
        isTop: boolean | null;
    }[];
    accountId: number;
}, {
    notes: {
        id: number;
        content: string;
        type?: NoteType | -1 | undefined;
        isArchived?: boolean | null | undefined;
        isRecycle?: boolean | null | undefined;
        isShare?: boolean | null | undefined;
        isTop?: boolean | null | undefined;
    }[];
    accountId: number;
}>, undefined, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    notes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        content: z.ZodString;
        type: z.ZodDefault<z.ZodUnion<[z.ZodNativeEnum<typeof NoteType>, z.ZodLiteral<-1>]>>;
        isArchived: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        isTop: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        isShare: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
        isRecycle: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        type: NoteType | -1;
        content: string;
        isArchived: boolean | null;
        isRecycle: boolean | null;
        isShare: boolean | null;
        isTop: boolean | null;
    }, {
        id: number;
        content: string;
        type?: NoteType | -1 | undefined;
        isArchived?: boolean | null | undefined;
        isRecycle?: boolean | null | undefined;
        isShare?: boolean | null | undefined;
        isTop?: boolean | null | undefined;
    }>, "many">;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    notes: {
        id: number;
        type: NoteType | -1;
        content: string;
        isArchived: boolean | null;
        isRecycle: boolean | null;
        isShare: boolean | null;
        isTop: boolean | null;
    }[];
    accountId: number;
}, {
    notes: {
        id: number;
        content: string;
        type?: NoteType | -1 | undefined;
        isArchived?: boolean | null | undefined;
        isRecycle?: boolean | null | undefined;
        isShare?: boolean | null | undefined;
        isTop?: boolean | null | undefined;
    }[];
    accountId: number;
}>>>;
