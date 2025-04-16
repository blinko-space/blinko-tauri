/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @link https://trpc.io/docs/v11/router
 * @link https://trpc.io/docs/v11/procedures
 */

import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from '../context';
import superjson from 'superjson'
import { OpenApiMeta } from 'trpc-to-openapi';

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const authProcedure = t.procedure.use(async ({ ctx, next, path }) => {
  //@ts-ignore
  if (!ctx?.name || ctx?.requiresTwoFactor) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: 'Unauthorized'
    })
  }
  if (ctx.permissions && Array.isArray(ctx.permissions)) {
    const hasPermission = ctx.permissions.some(perm => path?.includes(perm));
    if (!hasPermission) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: 'This token does not have permission to access this endpoint'
      });
    }
  }

  return next({
    ctx,
    ...{ id: ctx.sub }
  })
})


export const demoAuthMiddleware = t.middleware(async ({ ctx, next }) => {
  if (process.env.IS_DEMO) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: 'The operation is rejected because this is a demo environment'
    })
  }
  return next({
    ctx
  });
});

export const superAdminAuthMiddleware = t.middleware(async ({ ctx, next }) => {
  if (ctx.role !== 'superadmin') {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: 'You are not allowed to perform this operation'
    })
  }
  return next({
    ctx
  });
});


export const mergeRouters = t.mergeRouters;