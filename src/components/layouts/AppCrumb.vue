<template>
  <Breadcrumb>
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem
      v-for="el of nodePath"
      :key="el.path"
    >{{el.name}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script setup>
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';
import { useAppNav } from '@/store/appNav';
import { storeToRefs } from 'pinia'
import { useRoute, useRouter} from 'vue-router';
import { getNodePath } from '@/utils/treeData';

const route = useRoute()
const appNavStore = useAppNav()

const { navs } = storeToRefs(appNavStore)
const nodePath = ref([])

watchEffect(() => {
  const path = route.path
  const _nodePath = getNodePath(path, navs.value, [], 'path')
  if (_nodePath) {
    nodePath.value = _nodePath
  }else{
    nodePath.value = []
  }
})
</script>