import { defineStore } from "pinia";
import { queryCurUser } from "../apis/account";

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      curUser: {}
    }
  },
  actions: {
    async doQueryCurUser() {
      try {
        const resp = await queryCurUser()
        this.curUser = resp
      } catch (error) {
        throw error
      }
    }
  },
})
