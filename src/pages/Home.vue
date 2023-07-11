<template>
  <AppLayout>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </AppLayout>
</template>

<script setup>
import { useAccountStore } from '../store/account';
import { useAppNav } from '../store/appNav';

import AppLayout from '../components/layouts/AppLayout.vue';

const accountStore = useAccountStore()
const navStore = useAppNav()

const initApp = async () => {
  // await accountStore.doQueryCurUser()
  await navStore.doQueryNavs()
}

initApp()
</script>