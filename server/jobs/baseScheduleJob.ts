// src/server/plugins/BaseScheduleJob.ts
import { CronJob, CronTime } from "cron";
import { prisma } from "../prisma";

export abstract class BaseScheduleJob {
  protected static job: CronJob;
  protected static taskName: string;

  protected static async RunTask(): Promise<any> {
    throw new Error('RunTask must be implemented');
  }

  protected static createJob() {
    return new CronJob('* * * * *', async () => {
      try {
        const res = await this.RunTask();
        await prisma.scheduledTask.update({
          where: { name: this.taskName },
          data: {
            isSuccess: true,
            output: res,
            lastRun: new Date()
          }
        });
      } catch (error) {
        await prisma.scheduledTask.update({
          where: { name: this.taskName },
          data: {
            isSuccess: false,
            output: { error: error.message ?? 'internal error' },
            lastRun: new Date()
          }
        });
      }
    }, null, false);
  }

  static async Start(cronTime: string, immediate: boolean = true) {
    let success = false, output;
    let hasTask = await prisma.scheduledTask.findFirst({
      where: { name: this.taskName }
    });

    this.job.setTime(new CronTime(cronTime));
    this.job.start();

    if (immediate) {
      try {
        output = await this.RunTask();
        hasTask = await prisma.scheduledTask.findFirst({
          where: { name: this.taskName }
        });
        success = true;
      } catch (error) {
        output = error ?? (error.message ?? "internal error");
      }
    }

    if (!hasTask) {
      return await prisma.scheduledTask.create({
        data: {
          lastRun: new Date(),
          output,
          isSuccess: success,
          schedule: cronTime,
          name: this.taskName,
          isRunning: this.job.isActive
        }
      });
    } else {
      return await prisma.scheduledTask.update({
        where: { name: this.taskName },
        data: {
          lastRun: new Date(),
          output,
          isSuccess: success,
          schedule: cronTime,
          isRunning: this.job.isActive
        }
      });
    }
  }

  static async Stop() {
    this.job.stop();
    return await prisma.scheduledTask.update({
      where: { name: this.taskName },
      data: { isRunning: this.job.isActive }
    });
  }

  static async SetCronTime(cronTime: string) {
    this.job.setTime(new CronTime(cronTime));
    await this.Start(cronTime, true);
  }

  protected static async autoStart(schedule: string) {
    const task = await prisma.scheduledTask.findFirst({
      where: { name: this.taskName }
    });
    if (!task) {
      await this.Start(schedule, true);
    }
    await this.initializeJob();
  }

  protected static async initializeJob() {
    setTimeout(async () => {
      try {
        const task = await prisma.scheduledTask.findFirst({
          where: { name: this.taskName }
        });

        if (task?.isRunning) {
          this.job.setTime(new CronTime(task.schedule));
          this.job.start();

          const now = new Date().getTime();
          const [next1, next2] = this.job.nextDates(2);
          if (next1 == null || next2 == null ||
            now - task.lastRun.getTime() > next2.toMillis() - next1.toMillis()) {
            this.job.fireOnTick();
          }
        }
      } catch (error) {
        console.error(`Failed to initialize ${this.taskName}:`, error);
      }
    }, 1000);
  }
}