import { userCaller } from '@server/routerTrpc/_app';
import { NoteType } from '@shared/lib/types';
import { createTool } from '@mastra/core';
import { z } from 'zod';

export const searchBlinkoTool = createTool({
  id: 'search-blinko-tool',
  description: 'you can search note or blinko from blinko api.',
  //@ts-ignore
  inputSchema: z.object({
    content: z.string(),
    accountId: z.number(),
    page: z.number().default(1),
    size: z.number().default(30),
    orderBy: z.enum(["asc", 'desc']).default('desc'),
    type: z.union([z.nativeEnum(NoteType), z.literal(-1)]).default(-1),
    isArchived: z.union([z.boolean(), z.null()]).default(false).optional().describe('is archived if true return archived notes'),
    isRecycle: z.boolean().default(false).optional().describe('is recycle if true return recycle notes'),
    searchText: z.string().default('').optional(),
    withoutTag: z.boolean().default(false).optional(),
    withFile: z.boolean().default(false).optional(),
    withLink: z.boolean().default(false).optional(),
    isUseAiQuery: z.boolean().default(false).optional().describe('use RAG to search'),
    days: z.number().optional().describe('Number of days to search back from today. If provided, startDate will be set to today minus this many days, and endDate will be set to today.'),
    hasTodo: z.boolean().default(false).optional().describe('has to do list'),
  }),
  execute: async ({ context }) => {
    console.log(`search blinko: ${context.searchText || context.content}`);
 
    try {
      const caller = userCaller({
        id: context.accountId.toString(),
        exp: 0,
        iat: 0,
        name: 'admin',
        sub: context.accountId.toString(),
        role: 'superadmin'
      });

      // Calculate date range if days parameter is provided
      let startDate: Date | null = null;
      let endDate: Date | null = null;

      if (context.days && context.days > 0) {
        const now = new Date();
        endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
        
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - context.days);
        pastDate.setHours(0, 0, 0, 0); // Start of the day
        startDate = pastDate;
        
        console.log(`Using date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
      }

      // Regular search using the notes.list method
      const notes = await caller.notes.list({
        page: context.page,
        size: context.size,
        orderBy: context.orderBy,
        type: context.type,
        isArchived: context.isArchived,
        isUseAiQuery: context.isUseAiQuery,
        isRecycle: context.isRecycle,
        searchText: context.searchText || context.content,
        withoutTag: context.withoutTag,
        withFile: context.withFile,
        withLink: context.withLink,
        startDate: startDate,
        endDate: endDate,
        hasTodo: context.hasTodo
      });

      return {
        success: true,
        notes,
        message: `Found ${notes.length} notes matching your search criteria`,
        dateRange: context.days ? { 
          startDate: startDate?.toISOString(), 
          endDate: endDate?.toISOString(),
          daysSearched: context.days
        } : undefined
      };
    } catch (error) {
      console.error("Search error:", error);
      return {
        success: false,
        message: error.message || "An error occurred during search",
        error: error
      };
    }
  }
});