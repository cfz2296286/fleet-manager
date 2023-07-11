<template>
  <Modal
    title="查看参数"
    :visible="visible"
    @cancel="$emit('update:visible', false)"
  >
    <VueJsonPretty v-if="jsonStr" :data="JSON.parse(jsonStr)" />
  </Modal>
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { Modal } from 'ant-design-vue';

const props = defineProps({
  visible: Boolean,
  jsonStr: String
})

const $emit = defineEmits(['update:visible'])
</script>