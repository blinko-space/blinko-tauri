import { router, authProcedure, publicProcedure } from '../middleware';
import { z } from 'zod';
import { prisma } from '../prisma';
import { commentsSchema, accountsSchema, NotificationType } from '@shared/lib/prismaZodType';
import * as crypto from 'crypto';
import { AiService } from '@server/aiServer';
import { CreateNotification } from './notification';

const accountSchema = accountsSchema.pick({
  id: true,
  name: true,
  nickname: true,
  image: true
});

const baseCommentSchema = commentsSchema.extend({
  account: accountSchema.nullable(),
});

const commentWithRelationsSchema: z.ZodType<any> = baseCommentSchema.extend({
  note: z.object({
    account: z.object({
      id: z.number()
    }).nullable()
  }).nullable(),
  replies: z.array(baseCommentSchema.extend({
    account: accountSchema.nullable()
  })).optional()
});

export const commentRouter = router({
  create: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/comment/create', summary: 'Create a comment', tags: ['Comment'] } })
    .input(z.object({
      content: z.string(),
      noteId: z.number(),
      parentId: z.number().optional(),
      guestName: z.string().optional()
    }))
    .output(z.boolean())
    .mutation(async function ({ input, ctx }) {
      let { content, noteId, parentId, guestName } = input;

      const note = await prisma.notes.findFirst({
        where: {
          id: noteId
        },
        select: {
          accountId: true
        }
      });

      if (!note) {
        throw new Error('Note not found or not shareable');
      }

      if (parentId) {
        const parentComment = await prisma.comments.findFirst({
          where: { id: parentId, noteId }
        });
        if (!parentComment) {
          throw new Error('Parent comment not found');
        }
      }

      if (!ctx.id && !guestName) {
        guestName = "void-" + crypto
          .createHash('md5')
          .update(`${ctx.ip}-${JSON.stringify(ctx.userAgent)}`)
          .digest('hex')
          .slice(0, 5);
      }
      let validGuestUA = '';
      try {
        validGuestUA = JSON.stringify(ctx.userAgent)
      } catch (error) {
      }

      if (content.includes('@Blinko AI')) {
        AiService.AIComment({ content, noteId })
      }

      await prisma.comments.create({
        data: {
          content,
          noteId,
          parentId,
          accountId: ctx.id ? Number(ctx.id) : null,
          guestName: !ctx.id ? guestName : null,
          guestIP: ctx.ip?.toString(),
          guestUA: validGuestUA
        },
        include: {
          account: {
            select: {
              id: true,
              name: true,
              nickname: true,
              image: true
            }
          }
        }
      });
      if (Number(ctx.id) !== note?.accountId || !ctx.id) {
        CreateNotification({
          type: NotificationType.COMMENT,
          title: 'comment-notification',
          content: (ctx?.name ?? guestName) + ':' + content,
          metadata: {
            noteId,
            guestName,
          },
          accountId: Number(note?.accountId),
        })
      }
      return true
    }),

  list: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/comment/list', summary: 'Get comments list', tags: ['Comment'] } })
    .input(z.object({
      noteId: z.number(),
      page: z.number().default(1),
      size: z.number().default(20),
      orderBy: z.enum(['asc', 'desc']).default('desc')
    }))
    .output(z.object({
      total: z.number(),
      items: z.array(commentWithRelationsSchema)
    }))
    .query(async function ({ input }) {
      const { noteId, page, size, orderBy } = input;

      const [total, comments] = await Promise.all([
        prisma.comments.count({
          where: {
            noteId,
            parentId: null
          }
        }),
        prisma.comments.findMany({
          where: {
            noteId,
            parentId: null
          },
          orderBy: { createdAt: orderBy },
          skip: (page - 1) * size,
          take: size,
          include: {
            account: {
              select: {
                id: true,
                name: true,
                nickname: true,
                image: true
              }
            },
            note: {
              select: {
                account: {
                  select: {
                    id: true
                  }
                }
              }
            },
            replies: {
              orderBy: { createdAt: 'asc' },
              include: {
                account: {
                  select: {
                    id: true,
                    name: true,
                    nickname: true,
                    image: true
                  }
                }
              }
            }
          }
        })
      ]);

      return {
        total,
        items: comments
      };
    }),

  delete: authProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/comment/delete', summary: 'Delete a comment', protect: true, tags: ['Comment'] } })
    .input(z.object({
      id: z.number()
    }))
    .output(z.object({ success: z.boolean() }))
    .mutation(async function ({ input, ctx }) {
      const comment = await prisma.comments.findFirst({
        where: {
          id: input.id,
          OR: [
            { accountId: Number(ctx.id) },
            { note: { accountId: Number(ctx.id) } }
          ]
        }
      });

      if (!comment) {
        throw new Error('Comment not found or no permission');
      }

      await prisma.comments.deleteMany({
        where: {
          OR: [
            { id: input.id },
            { parentId: input.id }
          ]
        }
      });

      return { success: true };
    }),

  update: authProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/comment/update', summary: 'Update a comment', protect: true, tags: ['Comment'] } })
    .input(z.object({
      id: z.number(),
      content: z.string()
    }))
    .output(commentWithRelationsSchema)
    .mutation(async function ({ input, ctx }) {
      const { id, content } = input;

      const comment = await prisma.comments.findFirst({
        where: {
          id,
          accountId: Number(ctx.id)
        }
      });

      if (!comment) {
        throw new Error('Comment not found or no permission');
      }

      return await prisma.comments.update({
        where: { id },
        data: { content },
        include: {
          account: {
            select: {
              id: true,
              name: true,
              nickname: true,
              image: true
            }
          }
        }
      });
    })
});
