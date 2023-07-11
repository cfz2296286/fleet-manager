import { defineStore } from "pinia";

export const useAppTab = defineStore('app-tab', {
  state: () => {
    return {
      tabs: []
    }
  },
  actions: {
    addTab(item) {
      this.tabs = this.tabs.map(el=>({
        ...el,
        isActive: false
      })).concat([
        {
          ...item,
          isActive: true,
          isFixed: false
        }
      ])
    },
    removeTab(index) {
      this.tabs = this.tabs.filter((el, i)=>i !== index)
    },
    changeTab(index){
      this.tabs = this.tabs.map((el, i)=>({
        ...el,
        isActive: index === i
      }))
    }
  }
})