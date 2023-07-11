import { ref, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";

export default ({
  defaultQueryValues = {},
  queryListAction,
  deleteOneAction, 
  deleteListAction,
  pk = 'id',
  isAutoQuery = true,
  defaultPageSize = 10
}={}) => {

  const listData = ref([]);
  const total = ref(0);
  const loading = ref(false);
  const queryValues = ref(defaultQueryValues);
  const page = ref(1)
  const size = ref(defaultPageSize)
  const selectedKeys = ref([])

  const handleChangeSelect = (keys)=>{
    selectedKeys.value = keys
  }

  const doQueryList = async () => {
    loading.value = true
    try {
      const params = {
        page: page.value,
        size: size.value,
        ...queryValues.value
      }
      const resp = await queryListAction(params)
      
      loading.value = false
      if(resp){
        total.value = resp.count
        listData.value = resp.results
      }
    } catch (error) {
      loading.value = false
      console.log(error,'error');
      // throw error
    }
    
  }

  const handleRefresh = ()=>{
    page.value = 1
    doQueryList()
  }

  const handleChangeQueryValues = (values, force=1)=>{
    if(force){
      queryValues.value = values
      handleRefresh()
    }else{
      queryValues.value = {
        ...queryValues.value,
        ...values,
      }
      handleRefresh()
    }
  }

  const handleChangePage = (p) => {
    page.value = p
    doQueryList()
  }

  const handleChangeSize = (p, s) => {
    size.value = s
    handleRefresh()
  }

  const handleDelete = (rowData)=>{
    Modal.confirm({
      title: ' Are you sure to delete it?',      
      onOk: async ()=>{
        try {
          await deleteOneAction(rowData[pk])
          message.success('Successfully deleted!')
          doQueryList();
        } catch (error) {
          throw error
        }
      }
    })
  }

  const handleDeleteList = ()=>{
    Modal.confirm({
      title: 'Are you sure you want to batch delete the selected items?',
      onOk: async ()=>{
        try {
          await deleteListAction(selectedKeys.value)
          message.success('Successfully deleted in bulk!')
          doQueryList();
        } catch (error) {
          throw error
        }
      }
    })
  }

  onMounted(() => {
    if(isAutoQuery){
      doQueryList();
    }
  });

  return {
    listData,
    total,
    page,
    size,
    loading,
    queryValues,
    selectedKeys,
    doQueryList,
    handleChangeSelect,
    handleChangeQueryValues,
    handleChangePage,
    handleChangeSize,
    handleDelete,
    handleDeleteList,
    handleRefresh
  }

}