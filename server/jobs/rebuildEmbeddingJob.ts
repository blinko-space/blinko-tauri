import { BaseScheduleJob } from "./baseScheduleJob";
import { prisma } from "../prisma";
import { NotificationType } from "@shared/lib/prismaZodType";
import { CreateNotification } from "../routerTrpc/notification";
import { AiModelFactory } from "@server/aiServer/aiModelFactory";
import { AiService } from "@server/aiServer";

export const REBUILD_EMBEDDING_TASK_NAME = "rebuildEmbedding";

// JSON-serializable result record
export interface ResultRecord {
  type: 'success' | 'skip' | 'error';
  content: string;
  error?: string;
  timestamp: string; // Store as ISO string for JSON compatibility
}

// JSON-serializable progress object
export interface RebuildProgress {
  current: number;
  total: number;
  percentage: number;
  isRunning: boolean;
  results: ResultRecord[];
  lastUpdate: string; // Store as ISO string for JSON compatibility
}

export class RebuildEmbeddingJob extends BaseScheduleJob {
  protected static taskName = REBUILD_EMBEDDING_TASK_NAME;
  protected static job = this.createJob();
  // Add a force stop flag to terminate the running task
  private static forceStopFlag = false;

  static {
    this.autoStart('0 0 * * *'); // Run once a day at midnight by default
  }

  /**
   * Force restart the rebuild embedding task
   */
  static async ForceRebuild(force: boolean = true): Promise<boolean> {
    try {
      // Reset the force stop flag
      this.forceStopFlag = false;
      
      // Reset progress to 0 first
      const task = await prisma.scheduledTask.findFirst({
        where: { name: this.taskName }
      });

      // if (task?.isRunning) {
      //   console.log(`Task ${this.taskName} is already running, skipping duplicate execution`);
      //   return false;
      // }
      
      // Initialize default progress
      const initialProgress = {
        current: 0,
        total: 0,
        percentage: 0,
        isRunning: true,
        results: [],
        lastUpdate: new Date().toISOString()
      };

      if (task) {
        await prisma.scheduledTask.update({
          where: { name: this.taskName },
          data: {
            isRunning: true,
            isSuccess: false,
            output: initialProgress,
            lastRun: new Date()
          }
        });
      } else {
        await prisma.scheduledTask.create({
          data: {
            name: this.taskName,
            isRunning: true,
            isSuccess: false,
            output: initialProgress,
            schedule: '0 0 * * *',
            lastRun: new Date()
          }
        });
      }

      // Fire the task immediately
      this.job.fireOnTick();
      return true;
    } catch (error) {
      console.error("Failed to force rebuild embedding:", error);
      return false;
    }
  }

  /**
   * Stop the current rebuild task if it's running
   */
  static async StopRebuild(): Promise<boolean> {
    try {
      // Set the force stop flag to true
      this.forceStopFlag = true;
      
      // Stop the scheduled job
      await this.Stop();
      
      const task = await prisma.scheduledTask.findFirst({
        where: { name: this.taskName }
      });

      if (task && task.output) {
        const currentProgress = task.output as any;
        currentProgress.isRunning = false;

        await prisma.scheduledTask.update({
          where: { name: this.taskName },
          data: {
            isRunning: false,
            output: currentProgress
          }
        });
      }

      return true;
    } catch (error) {
      console.error("Failed to stop rebuild embedding:", error);
      return false;
    }
  }

  /**
   * Get current progress of the rebuild embedding task
   */
  static async GetProgress(): Promise<RebuildProgress | null> {
    try {
      const task = await prisma.scheduledTask.findFirst({
        where: { name: this.taskName }
      });

      if (!task) return null;

      return task.output as unknown as RebuildProgress;
    } catch (error) {
      console.error("Failed to get rebuild embedding progress:", error);
      return null;
    }
  }

  protected static async RunTask(): Promise<any> {
    // Get current task from database
    const task = await prisma.scheduledTask.findFirst({
      where: { name: this.taskName }
    });

    if (!task) {
      throw new Error("Task not found");
    }

    // Check if we need to run the task
    const currentProgress = task.output as any || {
      current: 0,
      total: 0,
      percentage: 0,
      isRunning: true,
      results: [],
      lastUpdate: new Date().toISOString()
    };

    if (!currentProgress.isRunning) {
      return currentProgress;
    }

    try {
      // Reset force stop flag at the beginning of the task
      this.forceStopFlag = false;
      
      // First, get vector store
      const { VectorStore } = await AiModelFactory.GetProvider();

      // Delete existing vectors if force is true
      await AiModelFactory.rebuildVectorIndex({
        vectorStore: VectorStore,
        isDelete: true
      });

      // Get all notes to process
      const notes = await prisma.notes.findMany({
        include: {
          attachments: true
        },
        where: {
          isRecycle: false
        }
      });

      // Initialize progress tracking
      const total = notes.length;
      let current = 0;
      const results: ResultRecord[] = [];

      // Process notes in batches
      const BATCH_SIZE = 5;

      console.log(`[${new Date().toISOString()}] start rebuild embedding, ${notes.length} notes`);

      for (let i = 0; i < notes.length; i += BATCH_SIZE) {
        // Check if force stop flag is set
        if (this.forceStopFlag) {
          const stoppedProgress = {
            current,
            total,
            percentage: Math.floor((current / total) * 100),
            isRunning: false,
            results: results.slice(-50), // Keep only latest 50 results
            lastUpdate: new Date().toISOString()
          };
          
          await prisma.scheduledTask.update({
            where: { name: this.taskName },
            data: {
              isRunning: false,
              output: stoppedProgress as any
            }
          });
          
          return stoppedProgress;
        }
        
        // Check if task was stopped through database
        const latestTask = await prisma.scheduledTask.findFirst({
          where: { name: this.taskName }
        });

        const latestProgress = latestTask?.output as any;
        if (latestProgress && !latestProgress.isRunning) {
          // Task was stopped
          return latestProgress;
        }

        const noteBatch = notes.slice(i, i + BATCH_SIZE);

        for (const note of noteBatch) {
          // Check force stop flag before processing each note
          if (this.forceStopFlag) {
            const stoppedProgress = {
              current,
              total,
              percentage: Math.floor((current / total) * 100),
              isRunning: false,
              results: results.slice(-50), // Keep only latest 50 results
              lastUpdate: new Date().toISOString()
            };
            
            await prisma.scheduledTask.update({
              where: { name: this.taskName },
              data: {
                isRunning: false,
                output: stoppedProgress as any
              }
            });
            
            return stoppedProgress;
          }
          
          console.log(`[${new Date().toISOString()}] processing note ${note.id}, progress: ${current}/${total}`);
          
          try {
            current++;
            const percentage = Math.floor((current / total) * 100);

            if (process.env.NODE_ENV === 'development') {
              await new Promise(resolve => setTimeout(resolve, 3000));
            }

            // Process note content
            if (note?.content != '') {
              const { ok, error } = await AiService.embeddingUpsert({
                createTime: note.createdAt,
                updatedAt: note.updatedAt,
                id: note?.id,
                content: note?.content,
                type: 'update' as const
              });

              // Record result
              if (ok) {
                results.push({
                  type: 'success',
                  content: note?.content.slice(0, 30) ?? '',
                  timestamp: new Date().toISOString()
                });
              } else {
                results.push({
                  type: 'error',
                  content: note?.content.slice(0, 30) ?? '',
                  error: error?.toString(),
                  timestamp: new Date().toISOString()
                });
              }
            }

            // Process attachments
            if (note?.attachments) {
              for (const attachment of note.attachments) {
                // Check if file is an image
                const isImage = (filePath: string): boolean => {
                  if (!filePath) return false;
                  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
                  return imageExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
                };

                if (isImage(attachment?.path)) {
                  results.push({
                    type: 'skip',
                    content: (attachment?.path),
                    error: 'image is not supported',
                    timestamp: new Date().toISOString()
                  });
                  continue;
                }

                const { ok, error } = await AiService.embeddingInsertAttachments({
                  id: note.id,
                  updatedAt: note.updatedAt,
                  filePath: attachment?.path
                });

                if (ok) {
                  results.push({
                    type: 'success',
                    content: decodeURIComponent(attachment?.path),
                    timestamp: new Date().toISOString()
                  });
                } else {
                  results.push({
                    type: 'error',
                    content: decodeURIComponent(attachment?.path),
                    error: error?.toString(),
                    timestamp: new Date().toISOString()
                  });
                }
              }
            }

            // Keep only the latest 50 results to prevent the output from getting too large
            const latestResults = results.slice(-50);

            // Update progress in database
            const updatedProgress = {
              current,
              total,
              percentage,
              isRunning: true,
              results: latestResults,
              lastUpdate: new Date().toISOString()
            };

            await prisma.scheduledTask.update({
              where: { name: this.taskName },
              data: {
                output: updatedProgress as any
              }
            });

          } catch (error) {
            console.error(`[${new Date().toISOString()}] error processing note ${note.id}:`, error);
            // Record error but continue processing
            results.push({
              type: 'error',
              content: note.content.slice(0, 30),
              error: error?.toString(),
              timestamp: new Date().toISOString()
            });
          }
        }
      }

      // Update final progress
      const finalProgress = {
        current,
        total,
        percentage: 100,
        isRunning: false,
        results: results.slice(-50), // Keep only latest 50 results
        lastUpdate: new Date().toISOString()
      };

      await prisma.scheduledTask.update({
        where: { name: this.taskName },
        data: {
          isRunning: false,
          isSuccess: true,
          output: finalProgress as any
        }
      });

      // Create notification
      await CreateNotification({
        title: 'embedding-rebuild-complete',
        content: 'embedding-rebuild-complete',
        type: NotificationType.SYSTEM,
        useAdmin: true,
      });

      return finalProgress;
    } catch (error) {
      console.error("Error rebuilding embedding index:", error);

      // Update with error status
      const errorProgress = {
        ...currentProgress,
        isRunning: false,
        results: [
          ...(currentProgress.results || []).slice(-49),
          {
            type: 'error',
            content: 'Task failed with error',
            error: error?.toString(),
            timestamp: new Date().toISOString()
          }
        ],
        lastUpdate: new Date().toISOString()
      };

      await prisma.scheduledTask.update({
        where: { name: this.taskName },
        data: {
          isRunning: false,
          isSuccess: false,
          output: errorProgress
        }
      });

      throw error;
    }
  }
} 