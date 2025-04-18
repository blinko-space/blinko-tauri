import sqlite3 from 'sqlite3';
import { prisma } from '../prisma';
import { userCaller } from '../routerTrpc/_app';
import { FileService } from '../lib/files';
import { getGlobalConfig } from '../routerTrpc/config';
import { Context } from '../context';
import { resetSequences } from '@server/lib/helper';
import { ProgressResult } from '@shared/lib/types';
type Memo = {
  id: number;
  creator_id: number;
  created_ts: number;
  updated_ts: number;
  content: string;

  // join memo_relation
  related_memo_id: number | null;
  type: 'REFERENCE' | 'COMMENT' | null;

  // join user
  nickname: string;
}



export class Memos {
  private db!: sqlite3.Database
  async initDB(filePath: string) {
    const dbPath = await FileService.getFile(filePath);
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('can not connect to memos db', err.message);
      }
    });
    return dbPath;
  }
  closeDB() {
    this.db.close()
  }

  async *importMemosDB(ctx: Context): AsyncGenerator<ProgressResult & { progress?: { current: number, total: number } }, void, unknown> {
    const rows: Memo[] = await new Promise((resolve, reject) => {
      this.db.all(`
            SELECT
              memo.id id, memo.creator_id creator_id, memo.created_ts created_ts, memo.updated_ts updated_ts, memo.content content,
              filtered_relation.related_memo_id related_memo_id, filtered_relation.type type,
              user.nickname nickname
            FROM memo
            LEFT JOIN (SELECT * FROM memo_relation WHERE type = 'COMMENT') AS filtered_relation
            ON memo.id = filtered_relation.memo_id
            LEFT JOIN user ON memo.creator_id = user.id
            ORDER BY id;
          `, (err, rows: Memo[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });

    const total = rows.length;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]!;
      try {
        if (row.type === 'COMMENT') {
          const parentMemo = rows.find(r => r.id === row.related_memo_id);
          if (!parentMemo) {
            yield { type: 'error', content: row?.content, error: new Error('parent memo note not found'), progress: { current: i + 1, total } };
            continue;
          }

          const blinkoNote = await prisma.notes.findFirst({ where: { content: parentMemo.content } });
          if (!blinkoNote) {
            yield { type: 'error', content: row?.content, error: new Error('parent blinko note not found'), progress: { current: i + 1, total } };
            continue;
          }

          let blinkoComment = await prisma.comments.findFirst({ where: { content: row.content, noteId: blinkoNote.id } });
          if (blinkoComment) {
            yield { type: 'skip', content: row?.content, progress: { current: i + 1, total } };
            continue;
          }

           // original author comment or anonymous comment
          if (parentMemo.creator_id === row.creator_id) {
            await userCaller(ctx).comments.create({
              content: row.content,
              noteId: blinkoNote.id
            });
          } else {
            await userCaller( { ...ctx, id: '' }).comments.create({
              content: row.content,
              noteId: blinkoNote.id,
              guestName: row.nickname,
            });
          }

          blinkoComment = await prisma.comments.findFirst({ where: { content: row.content, noteId: blinkoNote.id } });
          if (blinkoComment) {
            await prisma.comments.update({
              where: { id: blinkoComment.id },
              data: {
                createdAt: new Date(row.created_ts * 1000),
                updatedAt: new Date(row.updated_ts * 1000),
              }
            })

            yield {
              type: 'success',
              content: blinkoComment.content.slice(0, 30),
              progress: { current: i + 1, total }
            };
          }
        } else {
          const blinkoNote = await prisma.notes.findFirst({ where: { content: row.content } });
          if (blinkoNote && blinkoNote.type !== -1) {
            yield { type: 'skip', content: row?.content, progress: { current: i + 1, total } };
            continue;
          }

          const note = await userCaller(ctx).notes.upsert({
            id: blinkoNote?.id,
            type: 0,
            content: row.content,
            createdAt: new Date(row.created_ts * 1000),
            updatedAt: new Date(row.updated_ts * 1000),
          });

          if (note) {
            yield {
              type: 'success',
              content: note.content.slice(0, 30),
              progress: { current: i + 1, total }
            };
          }
        }
      } catch (error) {
        console.error('import memos error->', error);
        yield {
          type: 'error',
          content: row.content.slice(0, 30),
          error,
          progress: { current: i + 1, total }
        };
      }
    }

    try {
      await resetSequences();
      yield {
        type: 'success',
        content: 'Sequences reset successfully',
        progress: { current: total, total }
      };
    } catch (error) {
      console.error('reset sequences error->', error);
      yield {
        type: 'error',
        content: `Failed to reset sequences: ${error.message}`,
        error,
        progress: { current: total, total }
      };
    }
  }

  async *importFiles(ctx: Context): AsyncGenerator<ProgressResult & { progress?: { current: number, total: number } }, void, unknown> {
    const resources = await new Promise<Array<{
      memo_id: number,
      filename: string,
      blob: string,
      size: number,
      reference?: string,
      internal_path?: string,
    }>>((resolve, reject) => {
      const results: any[] = [];
      this.db.each(
        `SELECT * FROM resource`,
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          results.push(row);
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    const total = resources.length;
    for (let i = 0; i < resources.length; i++) {
      const row = resources[i];
      console.log(row)

      const memo: Memo = await new Promise<Memo>((resolve, reject) => {
        this.db.get(`SELECT * FROM memo WHERE id = ${row?.memo_id}`, (err, memo: Memo) => {
          if (err) reject(err);
          else resolve(memo);
        });
      });

      if (!memo) continue;

      const node = await prisma.notes.findFirst({ where: { content: memo.content } });
      if (!node) continue;

      try {
        const attachment = await prisma.attachments.findFirst({ where: { name: row?.filename } });
        if (attachment) {
          yield { type: 'skip', content: row?.filename, progress: { current: i + 1, total } };
          continue;
        }

        if (row?.blob) {
          const { filePath } = await FileService.uploadFile({
            //@ts-ignore
            buffer: row!.blob,
            originalName: row?.filename,
            type: "",
            accountId: Number(ctx.id),
            withOutAttachment: true
          });
          await FileService.createAttachment({
            path: filePath,
            name: row?.filename,
            size: row?.size,
            noteId: node.id,
            accountId: Number(ctx.id),
            type: ""
          });
        }

        const config = await getGlobalConfig({ useAdmin: true });
        //v0.22
        if (row?.reference && row?.reference != '') {
          await prisma.attachments.create({
            data: {
              name: row?.filename,
              path: config.objectStorage === 's3' ? '/api/s3file/' + row?.reference : '/api/file/' + row?.reference,
              size: row?.size,
              noteId: node.id,
            }
          });
        }

        //v0.21
        if (row?.internal_path && row?.internal_path != '') {
          await prisma.attachments.create({
            data: {
              name: row?.filename,
              path: config.objectStorage === 's3' ? '/api/s3file/' + row?.internal_path : '/api/file/' + row?.internal_path,
              size: row?.size,
              noteId: node.id,
            }
          });
        }

        yield {
          type: 'success',
          content: row?.filename,
          progress: { current: i + 1, total }
        };
      } catch (error) {
        console.error('import files error->', error);
        yield {
          type: 'error',
          content: row?.filename,
          error,
          progress: { current: i + 1, total }
        };
      }
    }

    try {
      await resetSequences();
      yield {
        type: 'success',
        content: 'Sequences reset successfully',
        progress: { current: total, total }
      };
    } catch (error) {
      console.error('reset sequences error->', error);
      yield {
        type: 'error',
        content: `Failed to reset sequences: ${error.message}`,
        error,
        progress: { current: total, total }
      };
    }
  }
}
