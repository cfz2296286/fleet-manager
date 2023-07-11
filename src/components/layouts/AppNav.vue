<template>
  <Menu
    mode="inline"
    :activeKey="route.path"
    :selected-keys="[route.path]"
    v-model:openKeys="openKeys"
    @click="handleClickMenu"
  >
    <AppNavItem
      v-for="el of navs"
      :key="el.path"
      :data="el"
    ></AppNavItem>
  </Menu>
</template>

<script setup>
import { Menu } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppNav } from '../../store/appNav';
import { storeToRefs } from 'pinia'
import AppNavItem from './AppNavItem.vue';
import { ref, watch } from 'vue';
import {getNodePath} from '@/utils/treeData'

const openKeys = ref([])
const router = useRouter()
const route = useRoute()
const appNavStore = useAppNav()

const { navs } = storeToRefs(appNavStore)

watch(navs, (val)=>{
  if(val.length){
    const nodePath = getNodePath(route.path, val, [], 'path')
    openKeys.value = nodePath ? nodePath.map(el=>el.path) : []
  }
})

const handleClickMenu = (e) => {
  router.push(e.key)
}
</script>
