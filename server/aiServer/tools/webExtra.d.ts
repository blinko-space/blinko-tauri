import { z } from 'zod';
export declare const webExtra: import("@mastra/core/tools").Tool<z.ZodObject<{
    urls: z.ZodArray<z.ZodString, "many">;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    accountId: number;
    urls: string[];
}, {
    accountId: number;
    urls: string[];
}>, undefined, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    urls: z.ZodArray<z.ZodString, "many">;
    accountId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    accountId: number;
    urls: string[];
}, {
    accountId: number;
    urls: string[];
}>>>;
