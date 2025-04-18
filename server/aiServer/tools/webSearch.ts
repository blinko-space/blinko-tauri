import { createTool } from '@mastra/core';
import { z } from 'zod';
import { tavily } from '@tavily/core';
import { getGlobalConfig } from '@server/routerTrpc/config';

export const webSearchTool = createTool({
  id: 'web-search-tool',
  description: 'you are a web search assistant,you can use api to search web,return the result',
  //@ts-ignore
  inputSchema: z.object({
    query: z.string().describe('the query to search'),
    accountId: z.number()
  }),
  execute: async ({ context }) => {
    try {
      const config = await getGlobalConfig({ useAdmin: true })
      if (!config.tavilyApiKey) {
        return 'No tavily api key found,go to settings to set it "tavilyApiKey"'
      }
      const client = tavily({ apiKey: config.tavilyApiKey });
      const result = await client.search(context.query, {
        max_results: config?.tavilyMaxResult ?? 5
      })
      client.extract
      return result
    } catch (e) {
      return e.message
    }
  }
});