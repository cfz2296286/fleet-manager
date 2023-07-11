<template>
  <div class="page-wrap">
    <div class="page-head">
      <PageHeader title="Equipment Monitoring"></PageHeader>
    </div>
    <div class="page-head">
      <div class="fl">
        <Button type="primary" @click="doQueryList">
          <RedoOutlined />Refresh
        </Button>
      </div>
      <div class="fr">
        <Select
          v-model:value="stationID"
          show-search
          placeholder="Select A Charging Station"
          style="width: 200px"
          :options="dropDownData.options"
          @dropdownVisibleChange="handleDropDownVisibleChange"
          @popupScroll="handlePopupScroll"
          @change="handleChange"
        ></Select>
      </div>
    </div>
    
    <div class="page-body">
      <div class="flex justify-around" style="padding: 25px 0; border: 1px solid #f0f0f0;">
        <div>
          <span class="dian total"></span>
          In-use Socket &nbsp;  {{ listData.data?.charge_pile_status_no?.total_charge_pile || 0 }}
        </div> 
        <div>
          <span class="dian idle"></span>
          Free Socket &nbsp; 
          {{ listData.data?.charge_pile_status_no?.total_avaliable_pile || 0 }}
        </div>
        <div>
          <span class="dian off-line"></span>
          Offline Socket &nbsp;
          {{ listData.data?.charge_pile_status_no?.total_unavaliable_pile || 0 }}
        </div>
        <div>
          <span class="dian hitch"></span>
          Faulty Socket &nbsp;
          {{ listData.data?.charge_pile_status_no?.total_charging_pile || 0 }}
        </div>
      </div>
      <div style="padding: 25px;">
        <div class="fl">
          <ApiOutlined style="color: #75C7F9;" /> Charge
      </div>
      </div>
      <List
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4, xxxl: 4 }"
        :data-source="listData.data?.all_data"
      >
      <template #renderItem="{ item }">
        <ListItem>
          <Card :title="item.charge_pile_id" headStyle="background-color: #8FBC8B;color:#fff;">
            <template #extra><a href="#" style="color: #fff;">{{ item.pile_status}}</a></template>
              <div><ApiOutlined /> {{ item.Voltage }}V</div>
              <div><ControlOutlined /> {{ item['Current.Import'] }}A</div>
              <div><BulbOutlined /> {{ item['Energy.Active.Import.Register'] /1000 }}kWh</div>
              <div><ThunderboltOutlined /> {{ item['Power.Active.Import'] }}W</div>
          </Card>
        </ListItem>
      </template>
      </List>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch,defineComponent,onMounted  } from 'vue';
import {List, ListItem, Card, Dropdown, Menu, CardMeta,Button, Typography, Tooltip, PageHeader,Select } from 'ant-design-vue';
import {EditOutlined, EllipsisOutlined, RedoOutlined, TableOutlined, ApiOutlined, ControlOutlined, BulbOutlined,ThunderboltOutlined} from '@ant-design/icons-vue';
import useNoPagingList from '@/setups/useNoPagingList';
import axios from 'axios';

import { queryList} from '@/apis/equipment';
import { queryLists } from '@/apis/station';
const stationID = ref()

onMounted(
  () => {
    init()
    return;
  }
)

function init(){
  queryLists().then(
    (rep)=>{
      stationID.value = rep.results[0].station_id;
      dropDownData.value.options = rep?.results?.map(item => ({
        value:item.station_id ?? 0,
        label:item.station_name ?? "",
      })) ?? [];
      handleChangeQueryValues({'stationID':stationID.value})
      // doQueryList()
    }
  )
  return stationID;
}

/* 下拉列表请求-初次的时候 */
const handleDropDownVisibleChange = async (open) => {
  if(open && dropDownData.value.options.length === 0 ){
    //初次加载
    const params = {
      ...dropDownData.value.pagination
      }
    const result = await queryLists(params);
    dropDownData.value.pagination.total = result.count ?? 0;
    dropDownData.value.isLoading = false;
    //从结果中map获取列表数据
    dropDownData.value.options = result?.results?.map(item => ({
      value:item.station_id ?? 0,
      label:item.station_name ?? "",
    })) ?? [];
    return dropDownData;
  }
}

/* 下拉滚动 */
const handlePopupScroll = async (e) => {
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

const {
  listData,
  loading,
  queryValues,
  selectedKeys,
  doQueryList,
  handleChangeSelect,
  handleChangeQueryValues,
  handleDelete,
  handleRefresh
} = useNoPagingList({
  defaultQueryValues:{'stationID':stationID.value},
  queryListAction: queryList,
  isAutoQuery:false
})

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
const handleChange= () =>{
  handleChangeQueryValues({'stationID':stationID.value})
}
const json = (data)=>{
  return eval(data)
}
</script>
<style scoped>
.dian{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}
.total{
    background: #2CE6D9;
}
.charge{
    background: #56A3FE;
}
.idle{
    background: #3ED881;
}
.off-line{
    background: #9A9A9A;
}

.hitch{
    background: #FFC105;
}
</style>