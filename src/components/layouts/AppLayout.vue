<template>
  <div class="app-wrap">
    <div class="app-side shadow">
      <div class="app-logo">
        <img :src="logo" alt="" height="70" />
      </div>
      <AppNav></AppNav>
    </div>
    <div class="app-content">
      <div class="app-head shadow">
        <AppTabNav></AppTabNav>
        <AppHeadBar></AppHeadBar>
      </div>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppTabNav from './AppTabNav.vue';
import AppHeadBar from './AppHeadBar.vue';
import AppNav from './AppNav.vue';
import logo from '../../assets/logo.png'
</script>

<style scoped>
.app-wrap {
  padding: 100px 0 0 220px;
}

.app-side {
  width: 220px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 2;
}

.app-head {
  height: 100px;
  width: calc(100% - 220px);
  position: fixed;
  top: 0;
  left: 220px;
  z-index: 1;
  background-color: var(--bgColor);
}

.app-main {
  margin: 12px;
  background-color: #fff;
  min-height: calc(100vh - 100px - 24px);
  display: flex;
  flex-direction: column;
}

.app-logo{
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
