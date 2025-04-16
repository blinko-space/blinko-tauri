import { router, authProcedure, publicProcedure } from '../middleware';
import { z } from 'zod';
import { prisma } from '../prisma';
import { GlobalConfig, ZConfigKey, ZConfigSchema, ZUserPerferConfigKey } from '../../shared/lib/types';
import { configSchema } from '@shared/lib/prismaZodType';
import { Context } from '../context';

export const getGlobalConfig = async ({ ctx, useAdmin = false }: { ctx?: Context, useAdmin?: boolean }) => {
  const userId = Number(ctx?.id ?? 0);
  const configs = await prisma.config.findMany();
  const isSuperAdmin = useAdmin ? true : ctx?.role === 'superadmin';

  const globalConfig = configs.reduce((acc, item) => {
    const config = item.config as { type: string, value: any };
    //If not login return the frist config
    if (
      item.key == 'isCloseBackgroundAnimation'
      || item.key == 'isAllowRegister'
      || item.key == 'language'
      || item.key == 'theme'
      || item.key == 'themeColor'
      || item.key == 'themeForegroundColor'
      || item.key == 'maxHomePageWidth'
      || item.key == 'customBackgroundUrl'
    ) {
      //if user not login, then use frist find config
      if (!userId) {
        acc[item.key] = config.value;
        return acc;
      }
    }
    //always return isUseAI config
    if (item.key == 'isUseAI') {
      acc[item.key] = config.value;
      return acc
    }
    if (!isSuperAdmin && !item.userId) {
      return acc;
    }
    const isUserPreferConfig = ZUserPerferConfigKey.safeParse(item.key).success;
    if ((isUserPreferConfig && item.userId === userId) || (!isUserPreferConfig)) {
      acc[item.key] = config.value;
    }
    return acc;
  }, {} as Record<string, any>);

  return globalConfig as GlobalConfig;
};

export const configRouter = router({
  list: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/v1/config/list', summary: 'Query user config list', protect: true, tags: ['Config'] } })
    .input(z.void())
    .output(ZConfigSchema)
    .query(async function ({ ctx }) {
      return await getGlobalConfig({ ctx })
    }),
  update: authProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/config/update', summary: 'Update user config', protect: true, tags: ['Config'] } })
    .input(z.object({
      key: ZConfigKey,
      value: z.any()
    }))
    .output(configSchema)
    .mutation(async function ({ input, ctx }) {
      const userId = Number(ctx.id)
      const { key, value } = input
      const isUserPreferConfig = ZUserPerferConfigKey.safeParse(key).success;
      if (isUserPreferConfig) {
        const matchedConfigs = await prisma.config.findMany({ where: { userId, key } });
        
        if (matchedConfigs.length > 0) {
          const configToKeep = matchedConfigs[0];
          const updateResult = await prisma.config.update({ 
            where: { id: configToKeep?.id }, 
            data: { config: { type: typeof value, value } } 
          });
          
          if (matchedConfigs.length > 1) {
            await prisma.config.deleteMany({
              where: {
                userId,
                key,
                id: { notIn: [configToKeep!.id!] }
              }
            });
          }
          
          return updateResult;
        }
        
        return await prisma.config.create({ data: { userId, key, config: { type: typeof value, value } } });
      } else {
        if (ctx.role !== 'superadmin') {
          throw new Error('You are not allowed to update global config')
        }
        const matchedConfigs = await prisma.config.findMany({ where: { key } });
        
        if (matchedConfigs.length > 0) {
          const configToKeep = matchedConfigs[0];
          const updateResult = await prisma.config.update({ 
            where: { id: configToKeep?.id }, 
            data: { config: { type: typeof value, value } } 
          });
          
          if (matchedConfigs.length > 1) {
            await prisma.config.deleteMany({
              where: {
                key,
                id: { notIn: [configToKeep!.id!] }
              }
            });
          }
          
          return updateResult;
        }
        
        return await prisma.config.create({ data: { key, config: { type: typeof value, value } } });
      }
    }),

  setPluginConfig: authProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/config/setPluginConfig', summary: 'Set plugin config', protect: true, tags: ['Config'] } })
    .input(z.object({
      pluginName: z.string(),
      key: z.string(),
      value: z.any()
    }))
    .output(z.any())
    .mutation(async function ({ input, ctx }) {
      const userId = Number(ctx.id)
      const { pluginName, key, value } = input
      const hasKey = await prisma.config.findFirst({ where: { userId, key: `plugin_config_${pluginName}_${key}` } })
      if (hasKey) {
        return await prisma.config.update({ where: { id: hasKey.id }, data: { config: { type: typeof value, value } } })
      }
      return await prisma.config.create({ data: { userId, key: `plugin_config_${pluginName}_${key}`, config: { type: typeof value, value } } })
    }),
  getPluginConfig: authProcedure
    .meta({ openapi: { method: 'GET', path: '/v1/config/getPluginConfig', summary: 'Get plugin config', protect: true, tags: ['Config'] } })
    .input(z.object({
      pluginName: z.string()
    }))
    .output(z.any())
    .query(async function ({ input, ctx }) {
      const userId = Number(ctx.id)
      const { pluginName } = input
      const configs = await prisma.config.findMany({
        where: {
          userId,
          key: {
            contains: `plugin_config_${pluginName}_`
          }
        }
      })
      return configs.reduce((acc, item) => {
        const key = item.key.replace(`plugin_config_${pluginName}_`, '');
        acc[key] = (item.config as { value: any }).value;
        return acc;
      }, {} as Record<string, any>);
    })
})
