import { ref, onMounted } from "vue";
import { Modal, message } from "ant-design-vue";

export default ({
  defaultQueryValues = {},
  queryListAction,
  deleteOneAction, 
  pk = 'id',
  isAutoQuery = true
}={}) => {

  const listData = ref([]);
  const loading = ref(false);
  const queryValues = ref(defaultQueryValues);
  const selectedKeys = ref([])

  const handleChangeSelect = (keys)=>{
    selectedKeys.value = keys
  }

  const doQueryList = async () => {
    loading.value = true
    try {
      const params = {
        ...queryValues.value
      }
      const resp = await queryListAction(params)
      loading.value = false
      listData.value = resp
    } catch (error) {
      loading.value = false
      throw error
    }
  }

  const handleRefresh = ()=>{
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

  const handleDelete = (rowData)=>{
    Modal.confirm({
      title: 'Are you sure to delete it?',
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

  onMounted(() => {
    if(isAutoQuery){
      doQueryList();
    }
  });

  return {
    listData,
    loading,
    queryValues,
    selectedKeys,
    doQueryList,
    handleChangeSelect,
    handleChangeQueryValues,
    handleDelete,
    handleRefresh
  }

}