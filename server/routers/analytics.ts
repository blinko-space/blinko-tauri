import { z } from "zod"
import { Prisma } from "@prisma/client"
import dayjs from "@shared/lib/dayjs"

import { router, authProcedure } from "../middleware"
import { prisma } from "../prisma"

export const analyticsRouter = router({
  dailyNoteCount: authProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/analytics/daily-note-count', summary: 'Query daily note count', protect: true, tags: ['Analytics'] } })
    .input(z.void())
    .output(z.array(z.object({
      date: z.string(),
      count: z.number()
    })))
    .mutation(async function ({ ctx }) {
      const dailyStats = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
        SELECT 
          to_char("createdAt"::date, 'YYYY-MM-DD') as date,
          COUNT(*) as count
        FROM "notes"
        WHERE "accountId" = ${parseInt(ctx.id)}
          AND "createdAt" >= NOW() - INTERVAL '1 year'
        GROUP BY "createdAt"::date
        ORDER BY "createdAt"::date ASC
      `;

      return dailyStats.map(stat => ({
        date: stat.date,
        count: Number(stat.count)
      }));
    }),

  monthlyStats: authProcedure
    .meta({ openapi: { method: 'POST', path: '/v1/analytics/monthly-stats', summary: 'Query monthly statistics', protect: true, tags: ['Analytics'] } })
    .input(z.object({
      month: z.string()
    }))
    .output(z.object({
      noteCount: z.number(),
      totalWords: z.number(),
      maxDailyWords: z.number(),
      activeDays: z.number(),
      tagStats: z.array(z.object({
        tagName: z.string(),
        count: z.number()
      })).optional()
    }))
    .mutation(async function ({ ctx, input }) {
      const startDate = dayjs(input.month).startOf('month').toDate()
      const endDate = dayjs(input.month).endOf('month').toDate()

      const noteCount = await prisma.notes.count({
        where: {
          accountId: parseInt(ctx.id),
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      })

      const wordStats = await prisma.$queryRaw<Array<{ date: string; words: bigint }>>`
        SELECT 
          to_char("createdAt"::date, 'YYYY-MM-DD') as date,
          SUM(LENGTH(content)) as words
        FROM "notes"
        WHERE "accountId" = ${parseInt(ctx.id)}
          AND "createdAt" >= ${startDate}
          AND "createdAt" <= ${endDate}
        GROUP BY "createdAt"::date
        ORDER BY words DESC
      `

      const totalWords = wordStats.reduce((sum, stat) => sum + Number(stat.words), 0)
      const maxDailyWords = wordStats.length > 0 ? Number(wordStats[0]!.words) : 0
      const activeDays = wordStats.length

      const tagStats = await prisma.tag.findMany({
        where: {
          accountId: parseInt(ctx.id),
          tagsToNote: {
            some: {
              note: {
                accountId: parseInt(ctx.id)
              }
            }
          }
        },
        select: {
          name: true,
          _count: {
            select: {
              tagsToNote: true
            }
          }
        },
        orderBy: {
          tagsToNote: {
            _count: 'desc'
          }
        }
      })

      const validTags = tagStats.filter(tag => tag._count.tagsToNote > 0)
      const TOP_TAG_COUNT = 10
      const topTags = validTags.slice(0, TOP_TAG_COUNT)
      
      const otherTagsCount = validTags.slice(TOP_TAG_COUNT).reduce((sum, tag) => sum + tag._count.tagsToNote, 0)

      const finalTagStats = [
        ...topTags.map(tag => ({
          tagName: tag.name,
          count: tag._count.tagsToNote
        }))
      ]

      if (otherTagsCount > 0) {
        finalTagStats.push({
          tagName: 'Others',
          count: otherTagsCount
        })
      }

      return {
        noteCount,
        totalWords,
        maxDailyWords,
        activeDays,
        tagStats: finalTagStats
      }
    })
})