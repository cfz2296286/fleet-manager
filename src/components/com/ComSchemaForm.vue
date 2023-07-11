<template>
  <Modal
    :visible="visible"
    :title="title"
    :keyboard="false"
    :mask-closable="false"
    :width="width"
    :ok-button-props="{
      loading: sending
    }"
    destroyOnClose
    @cancel="handleCancel"
    @ok="handleSubmit"
  >
    <Form :model="formValues" ref="formRef" :layout="formLayout">
      <FormItem
        v-for="el of fields"
        :key="el.name"
        :name="el.name"
        :label="el.label"
        :label-col="{span:labelCol}"
        :required="el.required"
      >
        <InputNumber
          v-if="el.type==='number'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></InputNumber>
        <Input.Password
          v-else-if="el.type==='password' && el.names && formValues[el.name]"
          autocomplete="new-password"
          v-model:value="formValues[el.name][el.names]"
          v-bind="el.inputProps"
        ></Input.Password>
        <Input.Password
          v-else-if="el.type==='password'"
          autocomplete="new-password"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></Input.Password>
        <InputBool
          v-else-if="el.type==='bool'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></InputBool>
        <RadioGroup
          v-else-if="el.type==='radio' && el.names && formValues[el.name]"
          v-model:value="formValues[el.name][el.names]"
          v-bind="el.inputProps"
        ></RadioGroup>
        <RadioGroup
          v-else-if="el.type==='radio'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></RadioGroup>
        <TreeSelect
          v-else-if="el.type==='treeSelect'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></TreeSelect>
        <InputTree
          v-else-if="el.type==='tree'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></InputTree>
        <InputDict
          v-else-if="el.type==='dict'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></InputDict>
        <InputImage
          v-else-if="el.type==='image'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></InputImage>
        <InputStation
          v-else-if="el.type==='station'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        >
        </InputStation>
        <DatePicker
          v-else-if="el.type==='date'&& el.names && formValues[el.name]"
          v-model:value="formValues[el.name][el.names]"
          v-bind="el.inputProps"
          :value-format="'YYYY-MM-DD HH:mm:ss'"
          :style="{
            width: '100%'
          }"
        ></DatePicker>
        <DatePicker
          v-else-if="el.type==='date'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
          :value-format="'YYYY-MM-DD HH:mm:ss'"
          :style="{
            width: '100%'
          }"
        ></DatePicker>
        <Select
          v-else-if="el.type==='select'"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></Select>
        <Input.TextArea
          v-else-if="el.type==='textarea'"
          v-model:value="formValues[el.name]"
          :autoSize="{ minRows:  4, maxRows: 6 }"
          v-bind="el.inputProps"
        ></Input.TextArea>
        <InputText
          v-else-if="el.names && formValues[el.name]"
          autocomplete="off"
         v-model:value="formValues[el.name][el.names]"
          v-bind="el.inputProps"
          data-="11"
        ></InputText>
        <InputText
          v-else
          autocomplete="off"
          v-model:value="formValues[el.name]"
          v-bind="el.inputProps"
        ></InputText>
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup>
import { Form, FormItem, Input, RadioGroup, Modal, InputNumber, TreeSelect, Select, DatePicker } from 'ant-design-vue';
import { reactive, ref, watch } from 'vue';
import InputBool from '../inputs/InputBool.vue';
import InputText from '../inputs/InputText.vue';
import InputTree from '../inputs/InputTree.vue';
import InputDict from '../inputs/InputDict.vue';
import InputImage from '../inputs/InputImage.vue';
import InputStation from '../inputs/InputStation.vue'
import { Item } from 'ant-design-vue/lib/menu';
import dayjs from 'dayjs';

const formRef = ref()
const formValues = ref({})

const props = defineProps({
  visible: Boolean,
  title: String,
  formLayout: {
    type: String,
    default: 'horizontal'
  },
  width: {
    type: Number,
    default: 500
  },
  fields: {
    type: Array
  },
  values: {
    type: Object
  },
  labelCol: {
    type: Number,
    default: 5
  },
  sending: {
    type: Boolean
  }
})

watch(()=>props.values, ()=>{
  formValues.value = {
    ...props.values
  }
  
  props.fields.map(item=>{
    if(item.names && formValues.value[item.name] == undefined){
      formValues.value[item.name] = ref({});
    }
    if(item.names && formValues.value[item.name][item.names] == undefined){
      const values= {
        [item.names] : ''
      }
      formValues.value[item.name] = {
        ...formValues.value[item.name],
        ...values
      }
    }
    if(item.type =='date'){
        formValues[item.name] = dayjs(formValues[item.name]).format('YYYY-MM-DD HH:mm:ss');
    }
  
  })
}, {
  immediate: true,
  deep: true
})

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = async ()=>{
  try {
    const values = await formRef.value.validateFields()
    console.log(values)
    emit('submit', values)
  } catch (error) {
    throw error
  }
}

const handleCancel = ()=>{
  emit('cancel')
}

</script>
