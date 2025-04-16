import { makeAutoObservable } from "mobx"
import { Store } from './standard/base';
import { api } from "@/lib/trpc";
import { PromiseState } from "./standard/PromiseState";
import { useEffect } from "react";
import dayjs from "dayjs";

interface MonthlyStats {
  noteCount: number;
  totalWords: number;
  maxDailyWords: number;
  activeDays: number;
  tagStats?: {
    tagName: string;
    count: number;
  }[];
}

export class AnalyticsStore implements Store {
  sid = 'AnalyticsStore';
  selectedMonth: string = dayjs().format("YYYY-MM");

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedMonth(month: string) {
    this.selectedMonth = month;
    this.dailyNoteCount.call();
    this.monthlyStats.call();
  }

  dailyNoteCount = new PromiseState({
    function: async () => {
      const data = await api.analytics.dailyNoteCount.mutate()
      return data
    }
  })

  monthlyStats = new PromiseState({
    function: async () => {
      const data = await api.analytics.monthlyStats.mutate({
        month: this.selectedMonth
      }) as MonthlyStats
      return data
    }
  })

  use() {
    useEffect(() => {
      this.dailyNoteCount.call()
      this.monthlyStats.call()
    }, [])
  }
}