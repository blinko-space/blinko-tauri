import { router, authProcedure } from '../middleware';
import { z } from 'zod';
import { AiService } from '@server/aiServer';
import { prisma } from '../prisma';
import { TRPCError } from '@trpc/server';
import { CoreMessage } from '@mastra/core';
import { AiModelFactory } from '@server/aiServer/aiModelFactory';
import { RebuildEmbeddingJob } from '../jobs/rebuildEmbeddingJob';
import { getAllPathTags } from '@server/lib/helper';

export const aiRouter = router({
  embeddingUpsert: authProcedure
    .input(z.object({
      id: z.number(),
      content: z.string(),
      type: z.enum(['update', 'insert'])
    }))
    .mutation(async ({ input }) => {
      const { id, content, type } = input
      const createTime = await prisma.notes.findUnique({ where: { id } }).then(i => i?.createdAt)
      const { ok, error } = await AiService.embeddingUpsert({ id, content, type, createTime: createTime! })
      if (!ok) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error
        })
      }
      return { ok }
    }),

  embeddingInsertAttachments: authProcedure
    .input(z.object({
      id: z.number(),
      filePath: z.string() //api/file/text.pdf
    }))
    .mutation(async ({ input }) => {
      const { id, filePath } = input
      try {
        const res = await AiService.embeddingInsertAttachments({ id, filePath })
        return res
      } catch (error) {
        return { ok: false, msg: error?.message }
      }
    }),

  embeddingDelete: authProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ input }) => {
      const { id } = input
      try {
        const res = await AiService.embeddingDelete({ id })
        return res
      } catch (error) {
        return { ok: false, msg: error?.message }
      }
    }),

  completions: authProcedure
    .input(z.object({
      question: z.string(),
      withTools: z.boolean().optional(),
      withOnline: z.boolean().optional(),
      withRAG: z.boolean().optional(),
      conversations: z.array(z.object({ role: z.string(), content: z.string() })),
      systemPrompt: z.string().optional()
    }))
    .mutation(async function* ({ input, ctx }) {
      try {
        const { question, conversations, withTools = false, withOnline = false, withRAG = true, systemPrompt } = input
        let _conversations = conversations as CoreMessage[]
        const { result: responseStream, notes } = await AiService.completions({
          question,
          conversations: _conversations,
          ctx,
          withTools,
          withOnline,
          withRAG,
          systemPrompt
        })
        for await (const chunk of responseStream.fullStream) {
          yield { chunk }
        }
        yield { notes }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message
        })
      }
    }),

  speechToText: authProcedure
    .input(z.object({
      filePath: z.string()
    }))
    .mutation(async function ({ input }) {
      // const { filePath } = input
      // try {
      //   const localFilePath = await FileService.getFile(filePath)
      //   const doc = await AiService.speechToText(localFilePath)
      //   return doc
      // } catch (error) {
      //   throw new Error(error)
      // }
    }),

  rebuildingEmbeddings: authProcedure
    .input(z.object({
      force: z.boolean().optional()
    }))
    .mutation(async function* ({ input }) {
      const { force } = input
      try {
        for await (const result of AiService.rebuildEmbeddingIndex({ force })) {
          yield result;
        }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message
        })
      }
    }),

  summarizeConversationTitle: authProcedure
    .input(z.object({
      conversations: z.array(z.object({ role: z.string(), content: z.string() })),
      conversationId: z.number()
    }))
    .mutation(async function ({ input }) {
      const { conversations, conversationId } = input
      const agent = await AiModelFactory.SummarizeAgent()
      const conversationString = JSON.stringify(
        conversations.map(i => ({
          role: i.role,
          content: i.content.replace(/\n/g, '\\n')
        })),
        null, 2
      );
      const result = await agent.generate(conversationString)
      const conversation = await prisma.conversation.update({
        where: { id: conversationId },
        data: { title: result?.text }
      })
      return conversation
    }),

  writing: authProcedure
    .input(z.object({
      question: z.string(),
      type: z.enum(['expand', 'polish', 'custom']).optional(),
      content: z.string().optional()
    }))
    .mutation(async function* ({ input }) {
      const { question, type = 'custom', content } = input
      const agent = await AiModelFactory.WritingAgent(type)
      const result = await agent.stream([
        {
          role: 'user',
          content: question
        },
        {
          role: 'system',
          content: `This is the user's note content: ${content || ''}`
        }
      ]);
      for await (const chunk of result.fullStream) {
        yield chunk
      }
    }),
  autoTag: authProcedure
    .input(z.object({
      content: z.string()
    }))
    .mutation(async function ({ input }) {
      const { content } = input
      const agent = await AiModelFactory.TagAgent()
      const tags = await getAllPathTags();
      const result = await agent.generate(
        `Existing tags list: [${tags.join(', ')}]\nNote content: ${content}\nPlease suggest appropriate tags for this content. Include full hierarchical paths for tags like #Parent/Child instead of just #Child.`
      )
      return result?.text?.trim().split(',').map(tag => tag.trim()).filter(Boolean) ?? []
    }),
  autoEmoji: authProcedure
    .input(z.object({
      content: z.string()
    }))
    .mutation(async function ({ input }) {
      const { content } = input
      const agent = await AiModelFactory.EmojiAgent()
      const result = await agent.generate("Please select and suggest appropriate emojis for the above content" + content)
      console.log(result.text)
      return result?.text?.trim().split(',').map(tag => tag.trim()).filter(Boolean) ?? [];
    }),
  AIComment: authProcedure
    .input(z.object({
      content: z.string(),
      noteId: z.number()
    }))
    .mutation(async function ({ input }) {
      return await AiService.AIComment(input)
    }),

  rebuildEmbeddingStart: authProcedure
    .input(z.object({
      force: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      await RebuildEmbeddingJob.ForceRebuild(input.force ?? true);
      return { success: true };
    }),

  rebuildEmbeddingStop: authProcedure
    .mutation(async () => {
      await RebuildEmbeddingJob.StopRebuild();
      return { success: true };
    }),

  rebuildEmbeddingProgress: authProcedure
    .query(async () => {
      const progress = await RebuildEmbeddingJob.GetProgress();
      return progress || {
        current: 0,
        total: 0,
        percentage: 0,
        isRunning: false,
        results: [],
        lastUpdate: new Date().toISOString()
      };
    }),

  testConnect: authProcedure
    .mutation(async () => {
      try {
        const agent = await AiModelFactory.TestConnectAgent();
        const result = await agent.generate([
          { role: 'user', content: 'test' }
        ]);
        console.log(result.text)
        return { success: !!result };
      } catch (error) {
        console.error("Connection test failed:", error);
        throw new Error(`Connection test failed: ${error?.message || "Unknown error"}`);
      }
    }),
})
