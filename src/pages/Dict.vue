<template>
  <div class="page-wrap">
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate">
          <PlusOutlined />新增字典类型
        </Button>
      </div>
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
          {title: '字典类型编码', dataIndex: 'typeCode', width: 150},
          {title: '字典类型名称', dataIndex: 'typeName'},
          {title: '字典值', key: 'values', width: 160, align: 'center'},
          {title: '操作', key: 'action', width: 160, align: 'center'},
        ]"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key==='action'">
            <ComRowAction
              @modify="handleModify(record)"
              @delete="handleDelete(record)"
            ></ComRowAction>
          </template>
          <template v-if="column.key==='values'">
            <Button type="primary" ghost @click="pid=record.typeCode">查看字典值</Button>
          </template>
        </template>
      </Table>
    </div>
    <div class="page-foot">
      <div class="fl"></div>
      <div class="fr">
        <Pagination
          :current="page"
          :page-size="size"
          :total="total"
          @change="handleChangePage"
          @show-size-change="handleChangeSize"
        ></Pagination>
      </div>
    </div>
    <ComSchemaForm
      :visible="formVisible"
      :title="formTitle"
      :fields="formFields"
      :values="formValues"
      :labelCol="6"
      :sending="formSending"
      @submit="handleSubmit"
      @cancel="handleCancel"
    ></ComSchemaForm>
    <DictValue
      v-model:pid="pid"
    ></DictValue>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';

import DictValue from './DictValue.vue'

import { queryList, createOne, modifyOne, deleteOne } from '@/apis/dict';

import ComSchemaForm from '@/components/com/ComSchemaForm.vue';
import ComRowAction from '@/components/com/ComRowAction.vue';

const pid = ref(null)

const formFields = computed(()=>{
  let result = [
    {
      name: 'typeCode',
      label: '字典类型编码'
    },
    {
      name: 'typeName',
      label: '字典类型名称'
    },
  ]
  return result
})

const {
  listData,
  loading,
  total,
  page,
  size,
  selectedKeys,
  queryValues,
  handleChangeSelect,
  handleChangeQueryValues,
  handleChangePage,
  handleChangeSize,
  handleRefresh,
  handleDelete
} = usePagingList({
  queryListAction: queryList,
  deleteOneAction: deleteOne
})

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
  editSuccessCallback: handleRefresh
})

watch(queryValues, (val)=>{
  handleChangeQueryValues(val)
}, {deep: 1})

</script>