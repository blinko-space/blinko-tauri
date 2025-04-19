import { z } from 'zod';
export declare const webSearchTool: import("@mastra/core/tools").Tool<z.ZodObject<{
    query: z.ZodString;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    query: string;
    accountId: number;
}, {
    query: string;
    accountId: number;
}>, undefined, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    query: z.ZodString;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    query: string;
    accountId: number;
}, {
    query: string;
    accountId: number;
}>>>;
