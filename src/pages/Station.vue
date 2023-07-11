<template>
  <div class="page-wrap"> 
    <div class="page-head">
      <PageHeader title="Charging Station Management"></PageHeader>  
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate">
          <PlusOutlined />Add New Charging Station
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
          {title: 'Station ID', dataIndex: 'station_id'},
          {title: 'Station Name', dataIndex: 'station_name'},
          {title: 'Latitude', dataIndex: 'station_lat'},          
          {title: 'Longitude', dataIndex: 'station_long'}, 
          {title: 'State', dataIndex: 'station_location_state', width: 200},
          {title: 'Postcode', dataIndex: 'station_postcode',align: 'center'},
          {title: 'Operator ID', dataIndex: 'operators_id_fk',align: 'center'},
          {title: 'Operate', dataIndex: 'action', width: 250, align: 'center'},
        ]"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex==='action'">
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
        <!-- <Button danger :disabled="selectedKeys.length===0">Delete Selected</Button> -->
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
import { computed, watch } from 'vue';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton, PageHeader,InputSearch} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';

import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';

import { queryList, createOne, modifyOne, deleteOne } from '@/apis/station';

const formFields = computed(()=>{
  let result = [
    {
      name: 'station_name',
      label: 'Station Name'
    },
    {
      name: 'station_lat',
      label: 'Latitude of station'
    },
    {
      name: 'station_long',
      label: 'Longitude of station',
      // type: 'image'
    },
    {
      name: 'station_location_state',
      label: 'State'
    },
    {
      name: 'station_postcode',
      label: 'Postcode'
    },
    {
      name: 'operators_id_fk',
      label: 'Operator ID',
    }
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
  handleDelete,
  queryValues,
  handleChangeSelect,
  handleChangeQueryValues,
  handleChangePage,
  handleChangeSize,
  doQueryList
} = usePagingList({
  pk:'station_id',
  queryListAction: queryList, 
  deleteOneAction: deleteOne
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
  pk:'station_id',
  createOneAction: createOne,
  modifyOneAction: modifyOne,
  editSuccessCallback: doQueryList,
})

const onSearch = searchValue => {
    // console.log(searchValue)
    handleChangeQueryValues({'search':searchValue});
  };

</script>
