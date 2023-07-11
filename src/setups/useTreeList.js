import { ref, onMounted,computed} from "vue";
import { getDirKeys } from "@/utils/treeData";
import { Modal, message } from "ant-design-vue";

export default ({
  queryTreeDataAction,
  deleteOneAction,
  pk="id",
  defaultOpenAll=true
} = {}) => {
  const treeData = ref([]);
  const openKeys = ref([]);
  const loading = ref(false);


  onMounted(() => {
    doQueryTreeData();
  });

  const dirKeys = computed(()=>{
    return getDirKeys(treeData.value, pk)
  })

  const openAllDisabled = computed(()=>{
    return dirKeys.value.length === openKeys.value.length
  })

  const closeAllDisabled = computed(()=>{
    return openKeys.value.length === 0
  })

  const handleChangeOpen = (keys)=>{
    openKeys.value = keys
  }

  const handleOpenAll = ()=>{
    openKeys.value = dirKeys.value
  }

  const handleCloseAll = ()=>{
    openKeys.value = []
  }

  const doQueryTreeData = async () => {
    loading.value = true
    try {
      const resp = await queryTreeDataAction()
      treeData.value = resp
      loading.value = false
      if(defaultOpenAll){
        openKeys.value = getDirKeys(resp, pk)
      }
    } catch (error) {
      loading.value = false
      throw error
    }
  }

  const handleDelete = (record)=>{
    Modal.confirm({
      title: ' Are you sure to delete it?',
      onOk: async()=>{
        try {
          await deleteOneAction(record[pk])
          message.success('Successfully deleted!')
          doQueryTreeData();
        } catch (error) {
          throw error
        }
      }
    })
  }

  return {
    treeData,
    loading,
    openKeys,
    openAllDisabled,
    closeAllDisabled,
    doQueryTreeData,
    handleChangeOpen,
    handleOpenAll,
    handleCloseAll,
    handleDelete
  }
}