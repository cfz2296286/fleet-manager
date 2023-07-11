<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Statement Management"></PageHeader>
    </div>
    <div class="page-head">
      <div class="fl">
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
          {title: 'Statement ID', dataIndex: 'statement_id'},
		      {title: 'Statement Datetime', dataIndex: 'statement_datetime',  align: 'center',customRender: ({text}) => {
              
              return moment(text).utc().format('YYYY-MM-DD HH:mm:ss')
            }},
          {title: 'Operators', dataIndex: 'operators_id_fk', align: 'center'},
          {title: 'Amount', dataIndex: 'statement_total_price', align: 'center'},
          {title: 'Total Capacity', dataIndex: 'statement_charge_capacity', width: 150, align: 'center'},
          {title: 'Operate', dataIndex: 'action', width: 250, align: 'center'},
        ]"
      >
        <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex==='action'">
          <Space>
            <Button type="primary" @click="handleDownload(record)">Download</Button>
          </Space>
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
    
  </div>
</template>

<script setup>
import { PageHeader } from 'ant-design-vue'
import usePagingList from '@/setups/usePagingList';
import { queryList,download } from '@/apis/reconciliation'
import moment from 'moment';
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton, Modal,InputSearch,message} from 'ant-design-vue';
import { ref } from 'vue';

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
  handleChangeSize
} = usePagingList({
  queryListAction: queryList
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

const handleDownload = (record)=>{
  download({operators_id:record.statement_id}).then(response => {
      if(response.code == 200){
        return window.location.href=response.pdf_download_url
      }else{
        message.error(response.msg)
      }
    })
  // axios
  //   .get('server/statement_url/')
  //   // .get('server/statement_url/?operators_id='+`${record.statement_id}`)
  //   .then(response => {
  //     console.log();
  //   })
  //   .catch(function (error) { // 请求失败处理
  //       console.log(error);
  //   });
}
</script>