import { api } from "@/lib/trpc";
import axios from "axios";
import { Store } from "./standard/base";
import { StorageState } from "./standard/StorageState";
import { PromisePageState, PromiseState } from "./standard/PromiseState";
import { BlinkoStore } from "./blinkoStore";
import { RootStore } from ".";

export class HubStore implements Store {
  sid = 'hubStore'
  autoObservable = true
  currentSiteUserId = null
  currentSiteURL = ''
  currentListType: 'home' | 'recommand' | 'site' = 'home'

  forceBlog = new StorageState({ key: 'forceBlog', default: true, value: true })

  shareNoteList = new PromisePageState({
    function: async ({ page, size }) => {
      const searchText = RootStore.Get(BlinkoStore).searchText
      if (this.currentListType == 'home') {
        const notes = await api.notes.publicList.mutate({ page, size, searchText })
        return notes
      } else if (this.currentListType == 'recommand') {
        const recommandList = await api.follows.recommandList.query({ searchText })
        return recommandList
      } else if (this.currentListType == 'site') {
        if (this.currentSiteURL) {
          const res = await axios.post(this.currentSiteURL + '/api/v1/note/public-list', { page, size, searchText })
          return res.data.map(i => {
            i.attachments = i.attachments.map(j => {
              j.path = this.currentSiteURL + j.path
              return j
            })
            return {
              ...i,
              originURL: this.currentSiteURL
            }
          })
        }
      }
    }
  })
  siteInfo = new PromiseState({
    function: async () => {
      const siteInfo = await api.public.siteInfo.query({ id: this.currentSiteUserId })
      return siteInfo
    }
  })
  followList = new PromisePageState({
    function: async () => {
      const followList = await api.follows.followerList.query({ userId: null })
      return followList
    }
  })
  followingList = new PromisePageState({
    function: async () => {
      const followingList = await api.follows.followList.query({ userId: null })
      return followingList
    }
  })
  loadAllData() {
    this.siteInfo.call()
    this.shareNoteList.resetAndCall({})
    this.followList.resetAndCall()
    this.followingList.resetAndCall()
  }
}