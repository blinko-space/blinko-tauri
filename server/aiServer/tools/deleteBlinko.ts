import { userCaller } from '@server/routerTrpc/_app';
import { createTool } from '@mastra/core';
import { z } from 'zod';

export const deleteBlinkoTool = createTool({
  id: 'delete-blinko-tool',
  description: 'you are a blinko assistant,you can use api to delete blinko,save to database',
  //@ts-ignore
  inputSchema: z.object({
    accountId: z.number(),
    ids: z.array(z.number())
  }),
  execute: async ({ context }) => {
    try {
      const caller = userCaller({
        id: context.accountId.toString(),
        exp: 0,
        iat: 0,
        name: 'admin',
        sub: context.accountId.toString(),
        role: 'superadmin'
      })
      const note = await caller.notes.trashMany({
        ids: context.ids
      })
      return true
    } catch (error) {
      console.log(error)
      return error.message
    }
  }
});