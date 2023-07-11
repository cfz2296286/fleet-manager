import { defineStore } from "pinia";
import { queryCurUserNavs } from "../apis/account";

export const useAppNav = defineStore('appNav', {
  state: () => {
    return {
      navs: [],
      navLoading: false
    }
  },
  actions: {
    async doQueryNavs() {
      this.navLoading = true
      try {
        const resp = await queryCurUserNavs()
        this.navLoading = false
        this.navs = resp
      } catch (error) {
        this.navLoading = false
        throw error
      }
    }
  }
})