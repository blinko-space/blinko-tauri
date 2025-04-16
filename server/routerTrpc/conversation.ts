import { router, authProcedure } from '../middleware';
import { z } from 'zod';
import { prisma } from '../prisma';

export const conversationRouter = router({
  create: authProcedure
    .input(z.object({
      title: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await prisma.conversation.create({
        data: {
          title: input.title,
          accountId: Number(ctx.id),
        }
      });
    }),
  clearMessages: authProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ input }) => {
      await prisma.message.deleteMany({
        where: {
          conversationId: input.id
        }
      });
      return {
        success: true
      }
    }),
  list: authProcedure
    .input(z.object({
      page: z.number().default(1),
      size: z.number().default(20),
    }))
    .query(async ({ input, ctx }) => {
      const skip = (input.page - 1) * input.size;
      const [total, conversations] = await Promise.all([
        prisma.conversation.count({
          where: { accountId: Number(ctx.id) }
        }),
        prisma.conversation.findMany({
          where: { accountId: Number(ctx.id) },
          skip,
          take: input.size,
          orderBy: { createdAt: 'desc' }
        })
      ]);
      return conversations;
    }),
  detail: authProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ input, ctx }) => {
      return await prisma.conversation.findUnique({
        where: { id: input.id, accountId: Number(ctx.id) },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      });
    }),

  update: authProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return await prisma.conversation.update({
        where: {
          id: input.id,
          accountId: Number(ctx.id)
        },
        data: {
          title: input.title,
        }
      });
    }),

  delete: authProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ input, ctx }) => {
      return await prisma.$transaction(async (prisma) => {
        await prisma.message.deleteMany({
          where: {
            conversationId: input.id
          }
        });
        return await prisma.conversation.delete({
          where: {
            id: input.id,
            accountId: Number(ctx.id)
          }
        });
      });
    }),
}); 