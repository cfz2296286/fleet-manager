<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Charging Pile Management"></PageHeader>  
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="handleCreate">
          <PlusOutlined />Add New Charging Pile
        </Button>
      </div>
      <div class="fr">
        <InputSearch type="text" @search="onSearch" allowClear></InputSearch>
      </div>
    </div>
    <div class="page-body">
      <Table
        row-key="pile_id"
        bordered
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: 'Charging Pile ID', dataIndex: 'pile_id'},
          {title: 'Name', dataIndex: 'pile_charge_type'},,
          {title: 'Model', dataIndex: 'pile_model', width: 100, align: 'center'},
          {title: 'State', dataIndex: 'pile_location_state', width: 100, align: 'center'},
          {title: 'SN', dataIndex: 'pile_sn', width: 100, align: 'center'},
          {title: 'Supplier', dataIndex: 'pile_vendor', width: 100, align: 'center'},
          // {title: 'Measurement confirmation software version', dataIndex: 'pile_metrfirmwareversion', width: 100, align: 'center'},
          {title: 'Power', dataIndex: 'pile_ratekw', width: 100, align: 'center'},
          {title: 'Charging Pile Connect Number', dataIndex: 'pile_connect_no', width: 250, align: 'center'},
          {title: 'Max Output Power', dataIndex: 'pile_outputcurrentmax', width: 250, align: 'center'},
          {title: 'Working Status', dataIndex: 'pile_status', width: 250, align: 'center'},
          {title: 'Operate', dataIndex: 'action',align: 'center'},
        ]"
        :row-selection="{
          selectedRowKeys: selectedKeys,
          onChange: handleChangeSelect
        }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex==='action'">
            <Space>
              <Button v-if="record.pile_status=='Available'"  @click="handleStart(record)" style="width: 116px;" >Start</Button>
              <Button v-else-if="record.pile_status=='Charging'" @click="handleStop(record)" style="width: 116px;">Stop </Button>
              <Button v-else disabled style="width: 116px;">unavaliable</Button>
              <Button type="primary" @click="handleModify(record)">modify</Button>
              <Button type="primary" danger @click="handleDelete(record)" >delete</Button>
            </Space>
          </template>
        </template>
      </Table>
    </div>
    <div class="page-foot">
      <div class="fl">
        <Button danger :disabled="selectedKeys.length===0"  @click="handleDeleteList">Delete All</Button>
      </div>
      <div class="fr">
        <Pagination
          :current="page"
          :page-size="size"
          :total="total"
          :showSizeChanger=false
          @change="handleChangePage"
          @show-size-change="handleChangeSize"
          hideOnSinglePage = true
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
import { computed, watch,ref,onMounted } from 'vue';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton,PageHeader,InputSearch,Modal, message} from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';

import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';

import { queryList, createOne, modifyOne, deleteOne, deleteMany,startOne,stopOne } from '@/apis/pile';

const formFields = computed(()=>{
  let result = [
    {
      name: 'pile_charge_type',
      label: 'Name',
      // required:true,
    },
    {
      name: 'pile_model',
      label: 'Model'
    },
    {
      name: 'pile_location_state',
      label: 'State',
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
      name: 'pile_sn',
      label: 'SN'
    },
    {
      name: 'pile_vendor',
      label: 'Supplier'
    },
    {
      name: 'pile_ratekw',
      label: 'Power'
    },
    {
      name: 'pile_connect_no',
      label: 'Connect Number'
    },
    {
      name: 'pile_outputcurrentmax',
      label: 'Max output power'
    },
    {
      name: 'pile_status',
      label: 'Working Status',
      type: 'select',
      inputProps:{
        options: [
          {value:'Available', label: 'Available'},
          {value:'Unavailable', label: 'Unavailable'},
        ]
      }
    },
    {
      name: 'station_id_fk',
      label: 'Station Id Fk',
      type: 'select',
      inputProps:{
        options:  JSON.parse(localStorage.getItem("stationIdList"))
      }
    }
   
    // {
    //   name: 'interfact_type',
    //   label: '接口类型',
    //   type: 'dict',
    //   inputProps:{
    //     code: 'interfact_type'
    //   }
    // },
  ]
  return result
})

const {
  listData,
  loading,
  size,  
  total,
  queryValues,
  selectedKeys,
  handleDelete,
  doQueryList,
  handleChangeSelect,
  handleChangeQueryValues,
  handleChangePage,
  handleChangeSize,
  handleDeleteList,
} = usePagingList({
  pk:'pile_id',
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
  pk:'pile_id',
  createOneAction: createOne,
  modifyOneAction: modifyOne,
  editSuccessCallback: doQueryList,
})

const onSearch = searchValue => {
    // console.log(searchValue)
    handleChangeQueryValues({'search':searchValue});
  };

  const handleStart = async (rowData)=>{
    console.log(rowData);
    let title = 'Are you sure to start?';
    const params = {
      'id_tag': rowData.pile_sn,
      'connector_id': rowData.pile_connect_no,
      'user_token': localStorage.getItem("token")
    }
    Modal.confirm({
      title: title,      
      onOk: async ()=>{
        try {
          const resp = await startOne(params)
          console.log(resp)
          message.success(resp.message)
          doQueryList();
        } catch (error) {
          throw error
        }
      }
    })  
  }

  const handleStop = async (rowData)=>{
    let title = 'Are you sure to stop?';
    const params = {
      'id_tag': rowData.pile_sn,
      'connector_id': rowData.pile_connect_no,
      'user_token': localStorage.getItem("token")
    }
    Modal.confirm({
      title: title,      
      onOk: async ()=>{
        try {
          const resp = await stopOne(params)
          console.log(resp)
          message.success(resp.message)
          doQueryList();
        } catch (error) {
          throw error
        }
      }
    })  
  }
// watch(queryValues, (val)=>{
//   handleChangeQueryValues(val)
// }, {deep: 1})

</script>
