<template>
  <Space>
    <slot name="left"></slot>
    <Tooltip title="添加下级" v-if="btns.includes('createChild')">
      <Button
        type="text"
        v-bind="btnProps.createChild"
        @click="emit('createChild')"
        size="large"
      >
        <template #icon>
          <SisternodeOutlined style="color: #4b4" />
        </template>
      </Button>
    </Tooltip>
    <Tooltip title="编辑" v-if="btns.includes('modify')">
      <Button
        type="text"
        v-bind="btnProps.modify"
        @click="emit('modify')"
        size="large"
      >
        <template #icon>
          <FormOutlined style="color:#07e" />
        </template>
      </Button>
    </Tooltip>
    <Tooltip title="删除" v-if="btns.includes('delete')">
      <Button
        type="text"
        danger
        v-bind="btnProps.delete"
        @click="emit('delete')"
        size="large"
      >
        <template #icon>
          <DeleteOutlined />
        </template>
      </Button>
    </Tooltip>
    <slot name="right"></slot>
  </Space>
</template>

<script setup>

import { Tooltip, Button, Space} from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, SisternodeOutlined, FormOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  btns: {
    type: Array,
    default: ['modify', 'delete']
  },
  btnProps: {
    type: Object,
    default: ()=>({})
  }
})

const emit = defineEmits(['createChild','modify','delete'])

</script>