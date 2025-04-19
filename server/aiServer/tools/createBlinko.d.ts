import { z } from 'zod';
export declare const upsertBlinkoTool: import("@mastra/core/tools").Tool<z.ZodObject<{
    content: z.ZodString;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    content: string;
    accountId: number;
}, {
    content: string;
    accountId: number;
}>, undefined, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    content: z.ZodString;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    content: string;
    accountId: number;
}, {
    content: string;
    accountId: number;
}>>>;
