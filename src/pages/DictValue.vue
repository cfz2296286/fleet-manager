<template>
  <Modal
    :width="960"
    title="查看字典纸"
    :visible="!!pid"
    @cancel="handleCancelModal"
    :mask-closable="false"
  >
    <div class="page-head">
      <Button type="primary" @click="handleCreate">
        <PlusOutlined />新增字典值
      </Button>
    </div>
    <div class="page-body">
      <Table
        row-key="id"
        bordered
        size="small"
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: '字典编码', dataIndex: 'dictCode', width: 120},
          {title: '字典名称', dataIndex: 'dictValue'},
          {title: '字典排序', dataIndex: 'dictSort', width: 80, align: 'center'},
          {title: '是否默认', key: 'dictDefault', width: 80, align: 'center'},
          {title: '操作', key: 'action', width: 180, align: 'center'},
        ]"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key==='action'">
            <Space>
              <Button type="link" size="small" @click="handleModify(record)">modify</Button>
              <Button type="text" danger size="small" @click="handleDelete(record)">delete</Button>
            </Space>
          </template>
          <template v-else-if="column.key==='dictDefault'">
            <Tag color="green" v-if="record.dictDefault==='1'">默认</Tag>
          </template>
        </template>
      </Table>
    </div>
    <ComSchemaForm
      :visible="formVisible"
      :title="formTitle"
      :fields="formFields"
      :values="formValues"
      :sending="formSending"
      @submit="handleSubmit"
      @cancel="handleCancel"
    ></ComSchemaForm>
  </Modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { queryList, createOne, modifyOne, deleteOne } from '@/apis/dictValue';
import { Modal } from 'ant-design-vue'
import { Button, Table, Space, Tag } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import useNoPagingList from '@/setups/useNoPagingList';
import useEdit from '@/setups/useEdit';
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';

const props = defineProps({
  pid: {
    type: [ String, Number ]
  }
})

const emit = defineEmits(['update:pid'])

const handleCancelModal = ()=>{
  emit('update:pid', null)
}

const formFields = computed(()=>{
  let result = [
    {label: '字典编码', name: 'dictCode'},
    {label: '字典名称', name: 'dictValue'},
    {label: '字典排序', name: 'dictSort', type: 'number'},
    {label: '是否默认', name: 'dictDefault', type: 'bool', inputProps: {
      trueValue: '1',
      falseValue: '0'
    }},
    {label: '字典状态', name: 'status', type: 'bool', inputProps: {
      trueValue: 1,
      falseValue: 0
    }},
  ]
  return result
})

const {
  listData,
  loading,
  queryValues,
  handleChangeQueryValues,
  handleRefresh,
  handleDelete
} = useNoPagingList({
  queryListAction: queryList,
  deleteOneAction: deleteOne,
  isAutoQuery: false
})

const defaultFormValues = ref({})

const {
  formTitle,
  formVisible,
  formValues,
  formSending,
  handleCreate,
  handleModify,
  handleCancel,
  handleSubmit,
} = useEdit({
  createOneAction: createOne,
  modifyOneAction: modifyOne,
  editSuccessCallback: handleRefresh,
  defaultFormValues: defaultFormValues
})


watch(()=>props.pid, (pid)=>{
  if(pid){
    defaultFormValues.value = {
      dictType: pid
    }
    handleChangeQueryValues({
      dictTypeCode: pid
    })
  }else{
    listData.value = []
  }
})

</script>