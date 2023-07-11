<template>
  <Select
    v-model:value="value"
    :options="dropDownData.options"
    @dropdownVisibleChange="handleDropDownVisibleChange"
    @popupScroll="handlePopupScroll"
    @change="handleChange"
  ></Select>
</template>

<script setup>
import { onMounted, ref, watch,onUpdated } from 'vue';
import { Select } from 'ant-design-vue'
import { queryLists } from '@/apis/station';


const props = defineProps({
  value: [String, Number, Array]
})

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
      value:item.station_id ?? 0,
      label:item.station_name ?? "",
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

const emit = defineEmits(['update:value'])

// watch(()=>props.value, async function(){
//   if(props.value && typeof props.value == "object"){
//       console.log(111);
//       props.value.value = props.value.station_id 
//       emit('update:value', props.value.value)
//   }
// }, {
//   immediate: true,
// })

onUpdated(()=>{
  if(props.value && typeof props.value == "object"){
      props.value.value = props.value.station_id 
      console.log(111,props.value.value);
      emit('update:value', props.value.value)
  }
})

onMounted(async ()=>{
  if(props.value && typeof props.value == "object"){
      props.value.value = props.value.station_id
      console.log(222,props.value.value);
      emit('update:value', props.value.value)
    }
 //初次加载
  const params = {
    ...dropDownData.value.pagination
  }
  const result = await queryLists(params);
  dropDownData.value.options = result?.results?.map(item=>({
    value:item.station_id ?? 0,
    label:item.station_name ?? "",
  }))
  
})


const handleChange = (val)=>{
  let newValue = val
  console.log(1212, newValue)
  emit('update:value', newValue)
}

</script>
