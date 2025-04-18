import { router, authProcedure, publicProcedure } from '@server/middleware';
import { z } from 'zod';
import { prisma } from '@server/prisma';
import { InputNotificationType, notificationsSchema, notificationType, NotificationType } from '@shared/lib/prismaZodType';

export const CreateNotification = async (input: {
  title: string,
  content: string,
  metadata?: any,
  type: InputNotificationType,
  accountId?: number,
  useAdmin?: boolean,
}) => {
  try {
    if (input.useAdmin) {
      const account = await prisma.accounts.findFirst({
        where: {
          role: 'superadmin'
        }
      })
      input.accountId = account?.id
    }
    delete input.useAdmin
    await prisma.notifications.create({
      data: { ...input, accountId: Number(input.accountId) },
    });
  } catch (error) {
    console.log(error)
  }
}

export const notificationRouter = router({
  list: authProcedure
    .meta({
      openapi: {
        method: 'GET', path: '/v1/notification/list', summary: 'Query notifications list', tags: ['Notification']
      },
    })
    .input(z.object({
      page: z.number().default(1),
      size: z.number().default(30),
    }))
    .output(z.array(notificationsSchema))
    .query(async ({ ctx, input }) => {
      const { page, size, } = input;

      const where = {
        accountId: Number(ctx.id),
      };

      const notifications = await prisma.notifications.findMany({
        where,
        orderBy: [
          { createdAt: 'desc' },
          { isRead: 'asc' }
        ],
        skip: (page - 1) * size,
        take: size,
      });

      return notifications;
    }),

  create: authProcedure
    .meta({
      openapi: {
        method: 'POST', path: '/v1/notification/create', summary: 'Create notification', tags: ['Notification']
      },
    })
    .input(z.object({
      type: notificationType,
      content: z.string(),
      title: z.string(),
      metadata: z.any().optional(),
    }))
    .output(z.boolean())
    .mutation(async ({ ctx, input }) => {
      await prisma.notifications.create({
        data: { ...input, accountId: Number(ctx.id), title: input.title, metadata: input.metadata },
      });
      return true;
    }),

  markAsRead: authProcedure
    .input(z.object({
      id: z.number().optional(),
      all: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, all } = input;

      if (all) {
        await prisma.notifications.updateMany({
          where: {
            accountId: Number(ctx.id),
            isRead: false,
          },
          data: {
            isRead: true,
          },
        });
      } else if (id) {
        await prisma.notifications.updateMany({
          where: {
            id,
            accountId: Number(ctx.id),
          },
          data: {
            isRead: true,
          },
        });
      }

      return true;
    }),

  unreadCount: authProcedure
    .query(async ({ ctx }) => {
      const count = await prisma.notifications.count({
        where: {
          accountId: Number(ctx.id),
          isRead: false,
        },
      });

      return count;
    }),

  delete: authProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      await prisma.notifications.deleteMany({
        where: {
          id: input.id,
          accountId: Number(ctx.id),
        },
      });

      return true;
    }),

});