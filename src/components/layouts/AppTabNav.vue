<template>
  <div class="app-tab-nav">
    <div class="tab-list">
      <div
        class="tab-item"
        v-for="(el, i) of tabs"
        :key="i" :class="{
          active: el.isActive
        }"
        @click="handleClickTab(el)"
      >
        {{el.title}}
        <div v-if="tabs.length > 1" class="close" @click.stop="handleCloseTab(i)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Menu } from 'ant-design-vue';
import { useAppTab } from '@/store/appTab';
import { useAppNav } from '@/store/appNav';
import { storeToRefs } from 'pinia'
import { useRoute, useRouter} from 'vue-router';
import { nextTick, watch, watchEffect } from 'vue';
import { getNodePath } from '@/utils/treeData';

const route = useRoute()
const router = useRouter()
const appTabStore = useAppTab()
const appNavStore = useAppNav()
const { tabs } = storeToRefs(appTabStore)
const { navs } = storeToRefs(appNavStore)

watchEffect(()=>{
  const path = route.path
  const index = tabs.value.findIndex(el=>el.path === path)
  if(index<0){
    const nodePath = getNodePath(path, navs.value, [], 'path')
    if(nodePath){
      const item = nodePath[nodePath.length-1]
      appTabStore.addTab({
        ...item,
        title: item.name
      })
    }
  }else{
    appTabStore.changeTab(index)
  }
})

const handleClickTab = (el)=>{
  router.push(el.path)
}

const handleCloseTab = (index)=>{
  if(tabs.value[index].isActive){
    if(index === tabs.value.length - 1){
      router.push(tabs.value[index-1].path)
    }else{
      router.push(tabs.value[index+1].path)
    }
  }
  setTimeout(()=>{
    appTabStore.removeTab(index)
  })
}
</script>

<style scoped lang="less">
.app-tab-nav {
  height: 44px;
  padding: 0 12px;
  background-color: var(--bgColor);
  overflow-x: auto;
  overflow-y: hidden;
}

.tab-list {
  display: flex;
  height: 100%;
  padding-top: 8px;
}

.tab-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 4px 4px 0 0;
  margin-right: 6px;
  color: var(--pColor);
  background-color: var(--bgColor2);
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: var(--bgColor3);

  }
  &.active {
    background-color: #fff;
  }
}

/* 关闭按钮 */
.close {
  width: 16px;
  height: 16px;
  position: relative;
  border-radius: 2px;
  margin-left: 6px;
}
.close:before,
.close:after {
  content: "";
  position: absolute;
  background-color: var(--pColor);
  top: 50%;
  left: 50%;
  width: 2px;
  height: 10px;
  margin-left: -1px;
  margin-top: -5px;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}

.close:hover {
  background-color: var(--pColor);
}

.close:hover:before,
.close:hover:after {
  background-color: #fff;
}

</style>