<template>
  <Switch
    :checked="value === trueValue"
    @change="handleChange"
  ></Switch>
</template>

<script setup>
import { Switch } from 'ant-design-vue';

const props = defineProps({
  value: {
    type: [String, Number, Boolean]
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  }
})

const emit = defineEmits(['update:value'])

const handleChange = (val)=>{
  let newValue = val ? props.trueValue : props.falseValue
  console.log(1212, newValue)
  emit('update:value', newValue)
}
</script>