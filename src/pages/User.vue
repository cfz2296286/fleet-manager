<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="App User Management"></PageHeader>  
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate('','Add New App User')">
          <PlusOutlined />Add New User
        </Button>
      </div>
      <div class="fr">
        <InputSearch type="text" @search="onSearch" allowClear></InputSearch>
      </div>
    </div>
    <div class="page-body">
      <Table
        row-key="appuser_id"
        bordered
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: 'User ID', dataIndex: 'appuser_id'},
          {title: 'Username', dataIndex: 'appuser_username'},
          {title: 'First Name', dataIndex: 'appuser_firstname'},
          {title: 'Last Name', dataIndex: 'appuser_lastname'},
          {title: 'Email', dataIndex: 'appuser_email'},
          {title: 'Phone Number', dataIndex: 'appuser_phone_no'},
          {title: 'Postcode', dataIndex: 'appuser_postcode'},
          // {title: '是否员工', dataIndex: 'is_staff',
          // customRender: ({ text }) => {
          //     let  value = text === true ? '是' : '否';
          //     return value
          //   }
          // },
          {title: 'Available', dataIndex: 'appuser_isactive',
          // customRender: ({ text }) => {
          //     let  value = text === '1' ? 'yes' : 'no';
          //     return value
          //   }
          },
          // {title: 'Superuser', dataIndex: 'is_superuser',
          // customRender: ({ text }) => {
          //     let  value = text === true ? 'yes' : 'no';
          //     return value
          //   }
          // },
          // {title: '车辆信息', key: 'verhicle', width: 150, align: 'center'},
          {
            title: 'Registration Datetime', 
            dataIndex: 'register_datetime', 
            customRender: ({text}) => {
              
              return text?moment(text).utc().format('YYYY-MM-DD HH:mm:ss'): '-'
            }

          },
          {title: 'Operate', dataIndex: 'action', width: 250, align: 'center'},
        ]"
        :row-selection="{
          selectedRowKeys: selectedKeys,
          onChange: handleChangeSelect
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key==='verhicle'">
            <Button type="primary" ghost @click="handleShowVehicles(record)">查看车辆</Button>
          </template>
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
    <Modal
      title="查看用户车辆"
      :visible="vShow"
      :mask-closable="false"
      :keyboard="false"
      width="960px"
      :footer="null"
      @cancel="handleHideVehicles"
    >
      <Vehicle :user-id="vUser.id"></Vehicle>
    </Modal>
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

import { queryList,createOne, modifyOne, deleteOne, deleteMany } from '@/apis/user';
import moment from 'moment';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton, Modal,PageHeader,InputSearch} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { ref,computed } from 'vue';
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';
import ComRowAction from '@/components/com/ComRowAction.vue';

import Vehicle from './Vehicle.vue'

const formFields = computed(()=>{
  let result = [
    {
      name: 'appuser_username',
      label: 'Username'
    },
    {
      name: 'appuser_password',
      label: 'Password',
      type: 'password',
    },
    {
      name: 'appuser_firstname',
      label: 'First Name'
    },
    {
      name: 'appuser_lastname',
      label: 'Last Name',
    },
    {
      name: 'appuser_phone_no',
      label: 'Phone Number',
    },
    {
      name: 'appuser_email',
      label: 'Email'
    },
    // {
    //   name: 'is_superuser',
    //   label: 'Is it a superuser?',
    //   type: 'radio',
    //   inputProps: {
    //     options: [
    //       {value:true, label: 'yes'},
    //       {value:false, label: 'no'},
    //     ]
    //   }
    // },
    {
      name: 'is_active',
      label: 'Is it available?',
      type: 'radio', 
      inputProps: {
        options: [
          {value:'1', label: 'yes'},
          {value:'0', label: 'no'},
        ] 
      }
    },
    {
      name: 'last_login',
      label: 'Registration Datetime',
      type: 'date'
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
  handleDelete,
  handleDeleteList,
  doQueryList
} = usePagingList({
  queryListAction: queryList,
  deleteOneAction: deleteOne,
  pk:'appuser_id',
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
  pk:'appuser_id'
})
const vShow = ref(false)
const vUser = ref({})

const handleShowVehicles = (record)=>{
  vShow.value = true
  vUser.value = record
}

const handleHideVehicles = (record)=>{
  vShow.value = false
  vUser.value = {}
}

const onSearch = searchValue => {
    // console.log(searchValue)
    handleChangeQueryValues({'search':searchValue});
  };

</script>