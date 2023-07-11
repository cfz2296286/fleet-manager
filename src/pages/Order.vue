<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Order Management"></PageHeader>
    </div>
    <div class="page-head">
      <div class="fl">
      </div>
      <div class="fr">
        <InputSearch type="text" @search="onSearch" allowClear></InputSearch>
      </div>
    </div>
    <div class="page-body">
      <!-- <ComSearchForm
        :fields="searchFields"
        :formValues="queryValues"
        @search="handleChangeQueryValues"
      ></ComSearchForm> -->
      <Table
        row-key="order_id"
        bordered
        :data-source="listData"
        :loading="loading"
        :pagination="false"
        :columns="[
          {title: 'ID', dataIndex: 'order_id', width: 120},        
          {title: 'Order start time', dataIndex: 'order_start_datetime',customRender: ({text}) => {
              
              return moment(text).utc().format('YYYY-MM-DD hh:mm:ss')
            }},
          {title: 'Order end time', dataIndex: 'order_end_datetime',customRender: ({text}) => {
              
              return moment(text).utc().format('YYYY-MM-DD HH:mm:ss')
            }},
          {title: 'Charging capacity', dataIndex: 'charge_capacity'},
          {title: 'Total order cost（include GST）', dataIndex: 'order_fee'},
          {title: 'Charging station ID', dataIndex: 'pile_id_fk'},
          {title: 'User Name', dataIndex: ['appuser_id_fk','appuser_username']},
          {title: 'Operate', dataIndex: 'action', width: 250, align: 'center'},
        ]"
      >
      <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex==='action'">
            <Space>
              <Button type="primary" @click="handleModify(record)">modify</Button>
              <Button type="primary" danger  @click="handleDelete(record)">delete</Button>
            </Space>
          </template>
            <!-- <ComRowAction
              @modify="handleModify(record)"
              @delete="handleDelete(record)"
            ></ComRowAction> -->
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
          :showSizeChanger=false
          hideOnSinglePage = true
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
import { ref,computed,onMounted} from 'vue';
import usePagingList from '@/setups/usePagingList';
import useEdit from '@/setups/useEdit';
import ComSearchForm from '@/components/com/ComSearchForm.vue';
import moment from 'moment';
import { PageHeader, Button, Pagination, Table, Space, Tag, InputSearch, RadioGroup, RadioButton, Modal, InputGroup} from 'ant-design-vue';
import ComRowAction from '@/components/com/ComRowAction.vue';
import { queryList,deleteOne,modifyOne,queryOne } from '@/apis/order'
import ComSchemaForm from '@/components/com/ComSchemaForm.vue';

import { queryLists } from '@/apis/station'

const infos = ref([]);

const formFields = computed(()=>{
  let result = [
    {
      name: 'order_start_datetime',
      label: 'Order start time',
      type: 'date'
    },
    {
      name: 'order_end_datetime',
      label: 'Order end time',
      type: 'date'
    },
    {
      name: 'charge_capacity',
      label: 'Charging capacity'
    },
    {
      name: 'order_fee',
      label: 'Total order cost',
    },
    {
      name: 'pile_id_fk',
      label: 'Charging station ID',
    },
    {
      name: 'appuser_id_fk',
      label: 'Username',
      names: 'appuser_username'
    },
    // {
    //   name: 'is_superuser',
    //   label: '是否是超级用户',
    //   type: 'radio',
    //   inputProps: {
    //     options: [
    //       {value:true, label: '是'},
    //       {value:false, label: '否'},
    //     ]
    //   }
    // },
    // {
    //   name: 'is_active',
    //   label: '账户是否可用',
    //   type: 'radio', 
    //   inputProps: {
    //     options: [
    //       {value:'1', label: '是'},
    //       {value:'0', label: '否'},
    //     ] 
    //   }
    // },
    // {
    //   name: 'last_login',
    //   label: '最后登录时间',
    //   // type: 'date'
    // },
  ]
  return result
})

const searchFields = computed(()=>{
  let result = [
    {
      name: 'order_id',
      label: 'Order ID'
    },
    {
      name: 'name',
      label: 'user name'
    },
    {
      name: 'pile_id',
      label: 'Charging station ID',
      // type:'select',
      // inputProps: {
      //   options:dropDownData.value.options
      // },
      // onDropdownVisibleChange:handleDropDownVisibleChange,
      // onPopupScroll:handlePopupScroll,
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
  handleDelete,
  queryValues,
  handleChangeSelect,
  handleChangeQueryValues,
  handleChangePage,
  handleChangeSize,
  doQueryList
} = usePagingList({
  pk:'order_id',
  queryListAction: queryList,
  deleteOneAction: deleteOne,
})

const {
  formTitle,
  formVisible,
  formValues,
  handleCancel,
  handleModify,
  handleSubmit,
} = useEdit({
  queryOneAction:queryOne,
  modifyOneAction: modifyOne,
  editSuccessCallback: doQueryList,
  pk:'order_id'
})

const onSearch = searchValue => {
    // console.log(searchValue)
    handleChangeQueryValues({'search':searchValue});
  };

/* 下拉列表请求-初次的时候 */
const handleDropDownVisibleChange = async (open) => {
  console.log(dropDownData.value.options,111111);
  if(open && dropDownData.value.options.length === 0 ){
    //初次加载
    const params = {
      ...dropDownData.value.pagination
      }
    const result = await queryLists(params);
    console.log(result);
    dropDownData.value.pagination.total = result.count ?? 0;
    dropDownData.value.isLoading = false;
    //从结果中map获取列表数据
    dropDownData.value.options = result?.results?.map(item => ({
      value:item.station_id ?? 0,
      label:item.station_name ?? "",
    })) ?? [];
    console.log(dropDownData.value.options);
    return dropDownData;
  }
}

/* 下拉滚动 */
const handlePopupScroll = async (e) => {
  console.log(dropDownData.value);
	//已经有的下拉项目 大于等于后台返回的下拉项总长度,那么就返回不请求了
  if(dropDownData.value.options.length >= dropDownData.value.pagination.total) return;
  const { scrollHeight, scrollTop, clientHeight } = e.target;
  if (scrollHeight - scrollTop === clientHeight) {
	//到达了底部,请求数据
    dropDownData.value.pagination.page++;//分页器自增1
    const params = {
      ...dropDownData.value.pagination
      }
    const result = await queryLists(params);
    //从结果中map获取列表数据
    const temp = result?.results?.map(item => ({
      label:item.station_id ?? 0,
      value:item.station_name ?? "",
    })) ?? [];
    //注意顺序,这里是先结构之前的,在结构之后的
    dropDownData.value.options = [...dropDownData.value.options,...temp];
    return dropDownData;
  }
}

// 下拉列表
const dropDownData = ref({
  options:[],//下拉项列表
  pagination:{
    page:1,
    pageSize:10,
    total:0,//用于记录数据总长度,后期判断是否还继续加载
  },//分页器下拉的
  isLoading:true, //是否正在加载数据
})

const getData = async () => {
    const resp = await queryLists()
    infos.rawValue = resp.results
    infos.rawValue.forEach(item => {
      item.label = item.station_id
      item.value = item.station_name
    });
    return {infos}
    // for(let i in searchFields.value){
    //   if(searchFields.value[i].type == 'select'){
    //     searchFields.value[i].inputProps.options = infos.rawValue;
    //   }
    // }
}


onMounted(
  () => {
    getData()
  }
)


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