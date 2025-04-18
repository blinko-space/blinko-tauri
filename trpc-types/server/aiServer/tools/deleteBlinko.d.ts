import { z } from 'zod';
export declare const deleteBlinkoTool: import("@mastra/core/dist/base-D0afZZ9D").n<z.ZodObject<{
    accountId: z.ZodNumber;
    ids: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    accountId: number;
    ids: number[];
}, {
    accountId: number;
    ids: number[];
}>, undefined, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    accountId: z.ZodNumber;
    ids: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    accountId: number;
    ids: number[];
}, {
    accountId: number;
    ids: number[];
}>>>;
