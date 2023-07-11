<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Vehicle Management"></PageHeader>  
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate">
          <PlusOutlined />Add New Vehicle
        </Button>
      </div>
      <div class="fr">
        <InputSearch type="text" @search="onSearch" allowClear></InputSearch>
      </div>
    </div>
    <div class="page-body">
      <Table
        row-key="id"
        bordered
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: 'Vehicle ID', dataIndex: 'car_id'},
          {title: 'Registration Number', dataIndex: 'car_registration_no'},
          {title: 'Connect Type', dataIndex: ['veh_id_fk','veh_charge_type']},
          {title: 'Brand', dataIndex: ['veh_id_fk','veh_brand']},
          {title: 'Model', dataIndex: ['veh_id_fk','veh_model']},
          {title: 'Register Datetime', dataIndex: 'register_datetime',customRender: ({text}) => {
              
              return moment(text).utc().format('YYYY-MM-DD HH:mm:ss')
            }},
          {title: 'Username', dataIndex: ['appuser_id_fk','appuser_username']},
          {title: 'Operate', dataIndex: 'action', width: 250, align: 'center'},
        ]"
        :row-selection="{
          selectedRowKeys: selectedKeys,
          onChange: handleChangeSelect
        }"
      >
      <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex==='action'">
            <Space>
              <Button type="primary" @click="handleModify(record)">modify</Button>
              <Button type="primary" @click="handleDelete(record)" danger>delete</Button>
            </Space>
          </template>
        </template>
    </Table>
    </div>
    <div class="page-foot">
      <div class="fl">
        <Button danger :disabled="selectedKeys.length===0" @click="handleDeleteList">Delete All</Button>
      </div>
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
      :width = "800"
      :visible="formVisible"
      :title="formTitle"
      :fields="formFields"
      :values="formValues"
      @submit="handleSubmit"
      @cancel="handleCancel"
    ></ComSchemaForm>
  </div>
</template>

<script setup>
import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';
import moment from 'moment';

import { queryList, modifyOne, deleteOne, deleteMany,createOne } from '@/apis/vehicle'
import { PageHeader, Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton,InputSearch} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { watch,computed } from 'vue';
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';

const props = defineProps({
  userId: String
})

const formFields = computed(()=>{
  let result = [
    {
      name: 'car_registration_no',
      label: 'Registration Number'
    },
    {
      name: 'veh_id_fk',
      label: 'Connect Type',
      names: 'veh_charge_type'
    },
    {
      name: 'veh_id_fk',
      label: 'Brand',
      names: 'veh_brand'
    },
    {
      name: 'veh_id_fk',
      label: 'Model',
      names: 'veh_model'
    },
    {
      name: 'register_datetime',
      label: 'Register Datetime',
      type:'date'
    },
    {
      name: 'appuser_id_fk',
      label: 'Username',
      names: 'appuser_username'
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
  handleChangeQueryValues,
  handleChangePage,
  handleChangeSize,
  handleDelete,
  doQueryList,
  handleDeleteList
} = usePagingList({
  queryListAction: queryList,
  deleteOneAction: deleteOne,
  pk:'car_id',
  deleteListAction: deleteMany
})

const {
  formTitle,
  formVisible,
  formValues,
  handleCreate,
  handleModify,
  handleCancel,
  handleSubmit,
} = useEdit({
  createOneAction: createOne,
  modifyOneAction: modifyOne,
  editSuccessCallback: doQueryList,
  pk:'car_id'
})

watch(()=>props.userId, (val)=>{
  if(val){
    handleChangeQueryValues({
      userId: val
    }, 1)
  }else{
    listData.value = []
  }
}, {immediate: true})

const onSearch = searchValue => {
    // console.log(searchValue)
    handleChangeQueryValues({'search':searchValue});
  };
</script>