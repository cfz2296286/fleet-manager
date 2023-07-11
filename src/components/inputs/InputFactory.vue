<template>
  <Cascader
    :options="options"
    v-model:value="inputValue"
    :allowClear="false"
  ></Cascader>
</template>

<script setup>
import { Cascader } from 'ant-design-vue';
import { ref, watch, computed} from 'vue';
import { queryFactorys } from '@/apis/valve';


const props = defineProps({
  value: Array,
  factoryCode: [String, Number],
  focusFirst: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:value', 'change', 'changeBuyFactory', 'changeOptions'])

const options = ref([])

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

watch(()=>props.factoryCode, async (val)=>{
  if(val){
    const resp = await queryFactorys({factoryCode:val})
    options.value = resp.map((factory) => ({
      value: factory.FactoryCode,
      label: factory.FactoryName,
      children: factory.factorysystem
        ? factory.factorysystem.map((sys) => ({
            value: sys.SystemCode,
            label: sys.SystemName,
            children: sys.subsystem
              ? sys.subsystem.map((sub) => ({
                  value: sub.SubSystemCode,
                  label: sub.SubSystemName,
                }))
              : [],
          }))
        : [],
    }));
    emit('changeOptions', resp)
    if(props.focusFirst){
      const _value = [
        resp[0].FactoryCode ,
        resp[0].factorysystem[0].SystemCode,
        resp[0].factorysystem[0].subsystem[0].SubSystemCode
      ]
      emit('changeBuyFactory', _value)
      emit('update:value', _value)
    }
  }
}, {
  immediate: true
})

</script>