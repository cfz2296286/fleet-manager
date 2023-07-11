<template>
  <Select
    v-model:value="value"
    :options="options"
  ></Select>
</template>

<script setup>
import { queryList } from '@/apis/dictValue'
import { onMounted, ref } from 'vue';
import { Select } from 'ant-design-vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  value: [String, Number, Array]
})

const options = ref([])

onMounted(async ()=>{
  const resp = await queryList({
    dictTypeCode: props.code
  })
  options.value = resp.map(el=>({
    value: el.dictCode,
    label: el.dictValue
  }))
})

</script>