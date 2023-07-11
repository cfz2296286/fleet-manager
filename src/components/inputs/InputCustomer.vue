<template>
  <Cascader
    :options="clientCustomers"
    :fieldNames="{
      value: 'code',
      label: 'name',
      children: 'children'
    }"
    v-model:value="inputValue"
    :allowClear="false"
  ></Cascader>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Cascader } from 'ant-design-vue';
import useBaseStore from '@/store/base';

const baseStore = useBaseStore()
const { clientCustomers } = storeToRefs(baseStore)
if(clientCustomers.value.length === 0){
  baseStore.queryClientCustomersAction()
}

const props = defineProps({
  value: Array,
  useLocalStorage: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:value', 'change'])

const inputValue = computed({
  set(val){
    if(props.useLocalStorage){
      localStorage.setItem('input-cutomer-value', JSON.stringify(val))
    }
    emit('change', val)
    emit('update:value', val)
  },
  get(){
    return props.value
  }
})

onMounted(()=>{
  if(props.useLocalStorage){
    const _cutomer = localStorage.getItem('input-cutomer-value')
    if(_cutomer){
      emit('change', JSON.parse(_cutomer))
      emit('update:value', JSON.parse(_cutomer))
    }
  }
})
</script>
