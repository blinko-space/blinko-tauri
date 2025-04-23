import { prisma } from "../prisma";

import { RECOMMAND_TASK_NAME } from "@shared/lib/sharedConstant";
import { BaseScheduleJob } from "./baseScheduleJob";
import { attachmentsSchema, tagSchema, tagsToNoteSchema, notesSchema } from "@shared/lib/prismaZodType";
import { z } from "zod";
import axios from "axios";

export const recommandListSchema = z.array(notesSchema.merge(
  z.object({
    attachments: z.array(attachmentsSchema).optional(),
    account: z.object({
      image: z.string().optional(),
      nickname: z.string().optional(),
      name: z.string().optional(),
      id: z.number().optional(),
    }).nullable().optional(),
    tags: z.array(tagsToNoteSchema.merge(
      z.object({
        tag: tagSchema
      })).optional()
    ).nullable().optional(),
    _count: z.object({
      comments: z.number()
    }).optional(),
    originURL: z.string().optional()
  }))
)

export type RecommandListType = z.infer<typeof recommandListSchema>

export class RecommandJob extends BaseScheduleJob {
  protected static taskName = RECOMMAND_TASK_NAME;
  protected static job = this.createJob();
  private static maxConcurrency = 5;

  static {
    this.initializeTask().catch(error => {
      console.error('Error initializing RecommandJob:', error);
    });
  }

  private static async initializeTask() {
    try {
      const followCount = await prisma.follows.count({
        where: {
          followType: 'following'
        }
      });

      if (followCount > 0) {
        console.log(`Found ${followCount} followings, scheduling RecommandJob`);
        this.autoStart("0 */6 * * *");

        this.RunTask().catch(err => {
          console.error('Initial RecommandJob execution failed:', err);
        });
      }
    } catch (error) {
      console.error('Failed to initialize RecommandJob:', error);
    }
  }

  private static async batchProcess<T, R>(
    items: T[],
    processFn: (item: T) => Promise<R>,
    batchSize: number = 5
  ): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(processFn));
      results.push(...batchResults);

      if (i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  static async RunTask() {
    let cachedList: { [key: string]: RecommandListType } = {};

    try {
      console.log('Running Cache Recommand List at', new Date().toISOString());
      const follows = await prisma.follows.findMany({
        where: {
          followType: 'following'
        },
        select: {
          accountId: true,
          siteUrl: true
        }
      });

      if (follows.length === 0) {
        console.log('No follows found, skipping task');
        await prisma.cache.delete({
          where: { key: 'recommand_list' },
        });
        return;
      }

      await this.batchProcess(follows, async (follow: any) => {
        try {
          const url = new URL(follow.siteUrl);
          const response = await axios.post<RecommandListType>(
            `${url.origin}/api/v1/note/public-list`,
            { page: 1, size: 30 },
            { timeout: 10000 }
          );

          const processedData = response.data.map(item => {
            const newItem = { ...item, originURL: url.origin };

            if (newItem.attachments) {
              newItem.attachments = newItem.attachments.map(a => ({
                ...a,
                path: `${url.origin}${a.path}`
              }));
            }

            return newItem;
          });

          if (!cachedList[follow.accountId]) {
            cachedList[follow.accountId] = [];
          }

          const accountId = follow.accountId || '0';
          if (cachedList[accountId]) {
            cachedList[accountId] = cachedList[accountId].concat(processedData);
          } else {
            cachedList[accountId] = processedData;
          }

        } catch (error) {
          console.error(`Error fetching data for ${follow.siteUrl}:`, error.message);
          return [];
        }
      }, this.maxConcurrency);

      const hasCache = await prisma.cache.findFirst({
        where: { key: 'recommand_list' },
        select: { id: true }
      });

      console.log('hasCache', cachedList);

      if (hasCache) {
        await prisma.cache.update({
          where: { id: hasCache.id },
          // @ts-ignore
          data: { value: cachedList }
        });
      } else {
        // @ts-ignore
        await prisma.cache.create({
          data: {
            key: 'recommand_list',
            // @ts-ignore
            value: cachedList
          }
        });
      }

      console.log('Successfully updated recommand_list cache');

    } catch (error) {
      console.error('RecommandJob failed:', error);
      throw error;
    } finally {
      cachedList = {};

      if (global.gc) {
        try {
          global.gc();
          console.log('Garbage collection triggered');
        } catch (e) {
          console.error('Failed to trigger garbage collection:', e);
        }
      }
    }
  }
}