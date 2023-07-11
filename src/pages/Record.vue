<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Price Management"></PageHeader>
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate('','Add New')">
          <PlusOutlined />Add New Price Data
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
          {title: 'Price ID', dataIndex: 'price_id', width: 120},
          {title: 'Price of Electricity', dataIndex: 'price_of_electricity'},
          // {title: 'Tariff Category ID', dataIndex: ''},
          {title: 'Price of Parking', dataIndex: 'price_of_parking'},
          {title: 'States', dataIndex: ['station_id_fk','station_location_state']},
          {title: 'Postcode', dataIndex: ['station_id_fk','station_postcode']},
          {title: 'Charging Station ID', dataIndex: ['station_id_fk','station_id']},
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
import { PageHeader } from 'ant-design-vue'
import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';
import { queryList,deleteOne,modifyOne,createOne,deleteMany,queryOne } from '@/apis/record';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton, Modal,InputSearch} from 'ant-design-vue';
import { ref,computed } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';

const formFields = computed(()=>{
  let result = [
    {
      name: 'price_of_electricity',
      label: 'Price of electricity'
    },
    {
      name: 'price_of_parking',
      label: 'Price of parking',
    },
    {
      name: 'station_id_fk',
      label: 'Charging station ID',
      type: 'station'
    },
    {
      name: 'set_datetime',
      label: 'Set Datetime',
      type: 'date',
      inputProps: {
        format:"YYYY-MM-DD HH:mm:ss",
        "show-time":"{ format: 'HH:mm' }",
        valueFormat:'YYYY-MM-DD HH:mm:ss'
      }
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
  doQueryList,
  handleDelete,
  handleDeleteList
} = usePagingList({
  queryListAction: queryList,
  deleteOneAction: deleteOne,
  pk:'price_id',
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
  queryOneAction: queryOne,
  pk:'price_id'
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