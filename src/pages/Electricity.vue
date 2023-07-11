<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Equipment monitoring"></PageHeader>
    </div>
    <div class="page-body">
      <List
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4, xxxl: 2 }"
        :data-source="data"
        :pagination="pagination"
      >
      <template #footer></template>
        <template #renderItem="{ item }">
          <ListItem>
            <Card :title="item.title">
              <div>
                目 3.599kWh团无数据图 电流 12.90...@ 压 234.4V功率 3.02k..日 增强版APP
              </div>
  
            </Card>
          </ListItem>
        </template>
      </List>
    </div>
    <!-- <div class="page-foot">
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
    </div> -->
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
import { computed, ref, watch,defineComponent  } from 'vue';
import {List, Card, Image, Typography, Tooltip, Slider, Avatar } from 'ant-design-vue';
import {EditOutlined, EllipsisOutlined, RedoOutlined, TableOutlined} from '@ant-design/icons-vue';
import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';

import DictValue from './DictValue.vue';


    const pagination = {
      onChange: page => {
        console.log(page);
      },
      pageSize: 12,
    };
    const size= 12;
  
// import { queryList, createOne, modifyOne, deleteOne } from '@/apis/dict';

const ListItem = List.Item;
const pid = ref(null)


const data = [];
for (let i = 0; i < 23; i++) {
  data.push({title: `${i} 充电桩`})
}


// const {
//   listData,
//   loading,
//   total,
//   page,
//   size,
//   selectedKeys,
//   queryValues,
//   handleChangeSelect,
//   handleChangeQueryValues,
//   handleChangePage,
//   handleChangeSize,
//   handleRefresh,
//   handleDelete
// } = usePagingList({
//   queryListAction: queryList,
//   deleteOneAction: deleteOne
// })

// const {
//   formTitle,
//   formVisible,
//   formValues,
//   formSending,
//   handleCreate,
//   handleModify,
//   handleCancel,
//   handleSubmit,
// } = useEdit({
//   createOneAction: createOne,
//   modifyOneAction: modifyOne,
//   editSuccessCallback: handleRefresh
// })

// watch(queryValues, (val)=>{
//   handleChangeQueryValues(val)
// }, {deep: 1})

</script>