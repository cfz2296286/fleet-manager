<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Operators Management"></PageHeader>  
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate('','Add New Operators')">
          <PlusOutlined />Add New Operator
        </Button>
      </div>
      <div class="fr">
        <InputSearch type="text" @search="onSearch" allowClear></InputSearch>
      </div>
      <!-- <div class="fr">
        <RadioGroup
          v-model:value="queryValues.status"
          :options="[
            {value: undefined, label: '全部'},
            {value: 1, label: '启用'},
            {value: 0, label: '禁用'},
          ]"
          optionType="button"
          buttonStyle="solid"
        ></RadioGroup>
      </div> -->
    </div>
    <div class="page-body">
      <Table
        row-key="id"
        bordered
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: 'Operators ID', dataIndex: 'operators_id'},
          {title: 'Username', dataIndex: ['user_id_fk','username']},
          {title: 'Registration Datetime', dataIndex: ['user_id_fk','date_joined'], customRender: ({text}) => {
              
              return moment(text).utc().format('YYYY-MM-DD HH:mm:ss')
            }},
          {title: 'Registrant', dataIndex: ['user_id_fk','first_name']},
          {title: 'Available',  dataIndex: ['user_id_fk','is_active'],
          customRender: ({ text }) => {
              let  value = text === true ? 'yes' : 'no';
              return value
            }},
          {title: 'Postcode', dataIndex: 'operators_postcode'},
          {title: 'States', dataIndex: 'operators_state'},
          {title: 'Operate', dataIndex: 'action', width: 160, align: 'center'},
        ]"
        :row-selection="{
          selectedRowKeys: selectedKeys,
          onChange: handleChangeSelect
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex==='action'">
            <!-- <ComRowAction
              @modify="handleModify(record)"
              @delete="handleDelete(record)"
            ></ComRowAction> -->
            <Space>
              <Button type="primary" @click="handleModify(record)">modify</Button>
              <Button type="primary" danger @click="handleDelete(record)">delete</Button>
            </Space>
          </template>
          <template v-else-if="column.dataIndex === 'status'">
            <Tag v-if="record.status === 1" color="green">启用</Tag>
            <Tag v-else>禁用</Tag>
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
      :width="800"
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
import { computed, watch } from 'vue';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton, Tooltip, PageHeader, InputSearch} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { queryList, createOne, modifyOne, deleteOne, deleteMany } from '@/apis/admin';
import moment from 'moment';

import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';

import ComSchemaForm from '@/components/com/ComSchemaForm.vue';
import ComRowAction from '@/components/com/ComRowAction.vue';


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
  handleDelete,
  handleDeleteList,
  doQueryList
} = usePagingList({
  pk:'operators_id',
  queryListAction: queryList,
  deleteOneAction: deleteOne,
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
  pk:'operators_id',
  createOneAction: createOne,
  modifyOneAction: modifyOne,
  editSuccessCallback: handleRefresh
})

const formFields = computed(()=>{
  let result = [
    {
      name: 'user_id_fk',
      label: 'Username',
      names: 'username'
    },
    {
      name: 'user_id_fk',
      label: 'Password',
      type: 'password',
      names: 'password',
    },
    {
      name: 'user_id_fk',
      label: 'Last login',
      type: 'date',
      names:'last_login',
      inputProps: {
        format:"YYYY-MM-DD HH:mm:ss",
        "show-time":"{ format: 'HH:mm' }",
        valueFormat:'YYYY-MM-DD HH:mm:ss'
      }
    },
    // {
    //   name: 'user_id_fk.date_joined',
    //   label: 'Registration Datetime',
    //   type: 'date'
    // },
    {
      name: 'user_id_fk',
      label: 'First name',
      names: 'first_name'
    },
    {
      name: 'user_id_fk',
      label: 'Last name',
      names: 'last_name'
    },
    {
      name: 'user_id_fk',
      label: 'Email address',
      names: 'email'
    },
    {
      name: 'user_id_fk',
      label: 'Available',
      names: 'is_active',
      type: 'radio', 
      inputProps: {
        options: [
          {value:true, label: 'yes'},
          {value:false, label: 'no'},
        ] 
      }
    },
    {
      name: 'operators_state',
      label: 'States',
      type: 'select',
      inputProps:{
        options: [
          {value:'nsw', label: 'NSW'},
          {value:'tas', label: 'TAS'},
          {value:'qld', label: 'QLD'},
          {value:'vic', label: 'VIC'},
          {value:'wa', label: 'WA'},
          {value:'nt', label: 'NT'},
          {value:'act', label: 'ACT'},
          {value:'as', label: 'AS'},
        ]
      }
    },
    {
      name: 'operators_postcode',
      label: 'Postcode',
    },
    {
      name: 'user_id_fk',
      names: 'is_superuser',
      label: 'Is it a superuser?',
      type: 'radio',
      inputProps: {
        options: [
          {value:true, label: 'yes'},
          {value:false, label: 'no'},
        ]
      }
    },
    // {
    //   name: 'is_active',
    //   label: 'Is it available?',
    //   type: 'radio', 
    //   inputProps: {
    //     options: [
    //       {value:'1', label: 'yes'},
    //       {value:'0', label: 'no'},
    //     ] 
    //   }
    // },
  ]
  if(formValues.value.id){
    result.splice(2, 2)
  }
  return result
})


// watch(queryValues, (val)=>{
//   handleChangeQueryValues(val)
// }, {deep: 1})

const onSearch = searchValue => {
    // console.log(searchValue)
    handleChangeQueryValues({'search':searchValue});
  };
</script>
