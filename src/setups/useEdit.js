import { ref } from "vue"
import { message } from "ant-design-vue"

export default ({
  pk='id',
  createOneAction,
  modifyOneAction,
  queryOneAction,
  editSuccessCallback,
  defaultFormValues
}={}) => {
  
  const formTitle = ref('')
  const formVisible = ref(false)
  const formValues = ref({})
  const formSending = ref(false)

  const handleCreate = (values, title)=>{
    formTitle.value = title || 'add'
    formVisible.value = true
    formValues.value = values || {}
  }

  const handleModify = async (rowData, title)=>{
    formTitle.value = title || 'modify'
    if(queryOneAction){
      const data = await queryOneAction(rowData[pk])
      formValues.value = {
        ...data
      }
    }else{
      formValues.value = {
        ...rowData
      }
    }
    formVisible.value = true
  }

  const handleCancel = ()=>{
    formTitle.value = ''
    formVisible.value = false
    formValues.value = {}
  }

  const handleSubmit = async (values)=>{
    if(defaultFormValues){
      values = {
        ...defaultFormValues.value,
        ...values
      }
    }
    if(!formSending.value){
      formSending.value = true
      try {
        if(!formValues.value[pk]){
          await createOneAction({
            ...values,
          })
          message.success('Successfully added')
          handleCancel()
          editSuccessCallback && editSuccessCallback()
        }else{
          await modifyOneAction({
            [pk]: formValues.value[pk],
            ...values
          })
          message.success('Successfully modified')
          handleCancel()
          editSuccessCallback && editSuccessCallback()
        }
        formSending.value = false
      } catch (error) {
        formSending.value = false
        throw error
      }
    }
  }

  return {
    formTitle,
    formVisible,
    formValues,
    formSending,
    handleCreate,
    handleModify,
    handleCancel,
    handleSubmit,
  }
}