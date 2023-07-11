<template>
  <SubMenu v-if="data.children && data.children.length > 0" :key="data.path" :title="data.name">
    <template #icon v-if="data.path === '/equipment'">
      <ToolFilled />
    </template>
    <template #icon v-if="data.path === '/client'">
      <MobileFilled />
    </template>
    <template #icon v-if="data.path === '/admin'">
      <SettingFilled />
    </template>
    <template #icon v-if="data.path === '/valve'">
      <FilterFilled />
    </template>
    <AppNavItem v-for="el of data.children" :key="el.path" :data="el" :level="level+1"></AppNavItem>
  </SubMenu>
  <MenuItem v-if="!data.children || data.children.length === 0" :key="data.path">{{data.name}}</MenuItem>
</template>

<script setup>
import { MenuItem, SubMenu } from 'ant-design-vue';
import { SettingFilled, MobileFilled, ToolFilled, FilterFilled} from '@ant-design/icons-vue';

const props = defineProps({
  level: {
    type: Number,
    default: 0
  },
  data: {
    type: Object,
    required: true
  }
})
</script>

<style>
.ant-menu-inline {
  border: 0
}
</style>