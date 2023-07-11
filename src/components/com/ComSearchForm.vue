<template>
  <div class="com-search-form">
    <Form @finish="handleSubmit" :labelCol="{span: 10}" :model="formValues">
      <Row :gutter="12">
        <Col v-bind="colSpan" v-for="el of fields" :key="el.name">
          <FormItem :label="el.label" :name="el.name">
            <!-- <div>{{ el }}</div> -->
            <Select
              v-if="el.type==='select'"
              v-model:value="formValues[el.name]"
              allow-clear
              :placeholder="`Please select${el.label}`"
              v-bind="el.inputProps"
              @dropdownVisibleChange="el.onDropdownVisibleChange"
              @popupScroll="el.onPopupScroll"
            ></Select>
            <Cascader
              v-else-if="el.type==='cascader'"
              v-model:value="formValues[el.name]"
              allow-clear
              :placeholder="`Please select${el.label}`"
              v-bind="el.inputProps"
            ></Cascader>
            <DatePicker
              v-else-if="el.type==='date'"
              v-model:value="formValues[el.name]"
              allow-clear
              :placeholder="`Please select${el.label}`"
              :value-format="'YYYY-MM-DD'"
              style="width:100%"
              v-bind="el.inputProps"
            ></DatePicker>
            <!-- <InputCustomer
              v-else-if="el.type==='customer'"
              v-model:value="formValues[el.name]"
              :placeholder="`请选择${el.label}`"
              v-bind="el.inputProps"
            ></InputCustomer>
            <InputFactory
              v-else-if="el.type==='factory'"
              v-model:value="formValues[el.name]"
              :placeholder="`请选择${el.label}`"
              v-bind="el.inputProps"
            ></InputFactory> -->
            <Input
              v-else
              v-model:value="formValues[el.name]"
              :placeholder="`Please Fill in${el.label}`"
              v-bind="el.inputProps"
            ></Input>
          </FormItem>
        </Col>
        <Col v-bind="colSpan" style="text-align:right;">
          <FormItem>
            <Space>
              <Button type="primary" html-type="submit">
                <SearchOutlined />Search
              </Button>
              <Button html-type="reset">
                <ClearOutlined />Reset
              </Button>
              <!-- <Button type="primary" ghost>
                <CloudDownloadOutlined />导出
              </Button> -->
            </Space>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script setup>
import { Button, Space, Row, Col, Input, Form, FormItem, Select, Cascader, DatePicker } from 'ant-design-vue';
import { ClearOutlined, SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
import { reactive, ref ,toRefs,watch} from 'vue';

// import InputCustomer from '../inputs/InputCustomer.vue'
// import InputFactory from '../inputs/InputFactory.vue'

const colSpan = {
  xxxl: 4,
  xxl: 6,
  xl: 8,
  lg: 12,
  md: 24,
  sm: 24,
  xs: 24
}

const emit = defineEmits(['search'])
const formValues = reactive({})

const props = defineProps({
  fields: {
    type: Array
  },
  hasExport: {
    type: Boolean,
    default: true
  },
  formatValues: {
    type: Function
  }
})

const { fields} = toRefs(props)

const handleSubmit = (values) => {
  let _values = {}
  for(let k in values){
    if(values[k] !== undefined && values[k] !== null && values[k] !== ''){
      _values[k] = values[k]
    }
  }
  if(props.formatValues){
    _values = props.formatValues(_values)
  }
  emit('search', _values)
}
</script>

<style scoped>
.com-search-form {
  padding: 20px 12px;
  padding-bottom: 0;
  border-bottom: 12px var(--bgColor) solid;
}

.com-search-form :deep(.ant-form-item){
  margin-bottom: 20px;
}
</style>
