import { router, authProcedure, demoAuthMiddleware, superAdminAuthMiddleware } from '@server/middleware';
import { z } from 'zod';
import { prisma } from '@server/prisma';
import { DBJob } from '@server/jobs/dbjob';
import '@server/jobs/recommandJob';
import { ArchiveJob } from '@server/jobs/archivejob';
import { UPLOAD_FILE_PATH } from '@shared/lib/pathConstant';
import { ARCHIVE_BLINKO_TASK_NAME, DBBAK_TASK_NAME } from '@shared/lib/sharedConstant';
import { scheduledTaskSchema } from '@shared/lib/prismaZodType';
import { Memos } from '../jobs/memosJob';
import { unlink } from 'fs/promises';
import { FileService } from '../lib/files';
import path from 'path';
import fs from 'fs';


export const taskRouter = router({
  list: authProcedure.use(superAdminAuthMiddleware)
    .meta({ openapi: { method: 'GET', path: '/v1/tasks/list', summary: 'Query user task list', protect: true, tags: ['Task'] } })
    .input(z.void())
    .output(z.array(scheduledTaskSchema))
    .query(async () => {
      return await prisma.scheduledTask.findMany()
    }),
  upsertTask: authProcedure.use(superAdminAuthMiddleware)
    .meta({ openapi: { method: 'GET', path: '/v1/tasks/upsert', summary: 'Upsert Task', protect: true, tags: ['Task'] } })
    .input(z.object({
      time: z.string().optional(),
      type: z.enum(['start', 'stop', 'update']),
      task: z.enum([ARCHIVE_BLINKO_TASK_NAME, DBBAK_TASK_NAME]),
    }))
    .output(z.any())
    .mutation(async ({ input }) => {
      const { time, type, task } = input
      if (type == 'start') {
        const cronTime = time ?? '0 0 * * *'
        return task == DBBAK_TASK_NAME ? await DBJob.Start(cronTime, true) : await ArchiveJob.Start(cronTime, true)
      }
      if (type == 'stop') {
        return task == DBBAK_TASK_NAME ? await DBJob.Stop() : await ArchiveJob.Stop()
      }
      if (type == 'update' && time) {
        return task == DBBAK_TASK_NAME ? await DBJob.SetCronTime(time) : await ArchiveJob.SetCronTime(time)
      }
    }),
  importFromBlinko: authProcedure.use(demoAuthMiddleware).use(superAdminAuthMiddleware)
    .input(z.object({
      filePath: z.string()
    }))
    .mutation(async function* ({ input, ctx }) {
      const { filePath } = input
      try {
        const localFilePath = await FileService.getFile(filePath)
        const res = DBJob.RestoreDB(localFilePath, ctx)
        for await (const result of res) {
          yield result;
        }
        try {
          await unlink(localFilePath)
          await FileService.deleteFile(filePath)
        } catch (error) {
        }
      } catch (error) {
        throw new Error(error)
      }
    }),

  importFromMemos: authProcedure.use(demoAuthMiddleware).use(superAdminAuthMiddleware)
    .input(z.object({
      filePath: z.string() //xxxx.db
    }))
    .mutation(async function* ({ input, ctx }) {
      try {
        const memos = new Memos();
        const dbPath = await memos.initDB(input.filePath);
        for await (const result of memos.importMemosDB(ctx)) {
          yield result;
        }
        for await (const result of memos.importFiles(ctx)) {
          yield result;
        }
        memos.closeDB();
        try {
          await unlink(dbPath)
          await FileService.deleteFile(input.filePath)
        } catch (error) {
        }
      } catch (error) {
        throw new Error(error)
      }
    }),

  exportMarkdown: authProcedure
    .input(z.object({
      format: z.enum(['markdown', 'csv', 'json']),
      baseURL: z.string(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    })).output(z.object({
      success: z.boolean(),
      downloadUrl: z.string().optional(),
      fileCount: z.number().optional(),
      error: z.string().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const result = await DBJob.ExporMDFiles({ ...input, ctx });
      setTimeout(async () => {
        try {
          const zipPath = path.join(UPLOAD_FILE_PATH, result.path);
          if (fs.existsSync(zipPath)) {
            await unlink(zipPath);
          }
        } catch (error) {
          console.warn('Failed to cleanup export zip file:', error);
        }
      }, 5 * 60 * 1000);
      return {
        success: true,
        downloadUrl: `/api/file${result.path}`,
        fileCount: result.fileCount
      };
    }),
})
