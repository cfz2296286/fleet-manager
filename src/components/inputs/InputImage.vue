<template>
    <div class="input-upload">
      <Image v-if="value" :src="value" :width="100" :height="100"></Image>
      <Upload
        :custom-request="handleUpload"
        :show-upload-list="false"
      >
        <div class="upload-btn">
          <loading-outlined v-if="loading"></loading-outlined>
          <PlusOutlined v-else></PlusOutlined>
          <div class="ant-upload-text">上传</div>
        </div>
      </Upload>
    </div>
</template>

<script setup>
import { uploadFile } from "@/apis/upload";
import { Upload, Image } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined} from "@ant-design/icons-vue";
import { ref } from "vue";

const props = defineProps({
  value: {
    type: String
  }
})

const emit = defineEmits(['update:value'])

const loading = ref(false)

const handleUpload = async ({file})=>{
  if(!loading.value){
    loading.value = true
    const data = new FormData()
    data.append('file', file)
    try {
      const resp = await uploadFile(data)
      emit('update:value', resp.replace(/\\/g, '/'))
      loading.value = false
    } catch (error) {
      loading.value = false
      throw error
    }
  }
}
</script>


<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.input-upload{
  display: flex;
  align-items: center;
}
.upload-btn{
  width: 100px;
  height: 100px;
  border: 1px #ddd dashed;
  border-radius: 3px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.input-upload :deep( .ant-image-img){
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>