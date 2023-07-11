<template>
  <div class="page-wrap">
    <div class="page-head">
  <PageHeader title="积分管理"></PageHeader>
</div>
    <div class="page-body">
      <Table
        row-key="id"
        bordered
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: '用户名', dataIndex: 'userName'},
          {title: '昵称', dataIndex: 'nickName'},
          {title: '电话', dataIndex: 'phone'},
          {title: '变动积分', dataIndex: 'email'},
          {title: '描述', dataIndex: 'verhicle', width: 150, align: 'center'},
          {title: '交易时间', dataIndex: 'createTime', width: 200},
        ]"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key==='verhicle'">
            <Button type="primary" ghost @click="handleShowVehicles(record)">查看车辆</Button>
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
import { queryList } from '@/apis/integral'
import { Button, Pagination, Table, Space, Tag, RadioGroup, RadioButton, Modal} from 'ant-design-vue';
import { ref } from 'vue';

import Vehicle from './Vehicle.vue'
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
</script>