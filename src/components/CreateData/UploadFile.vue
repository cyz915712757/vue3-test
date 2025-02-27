<template>
  <el-upload
    drag
    multiple
    :file-list="fileList"
    ref="uploadRef"
    class="upload-file"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
    :http-request="uploadFile"
    :auto-upload="false"
  >
    <template #trigger>
      <el-icon class="el-icon--upload"></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </template>
    <!-- <el-button type="primary">Click to upload</el-button> -->
    <template #tip>
      <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </el-upload>
  <el-button @click="handleUpload">手动上传</el-button>
</template>

<script setup>
import request from 'axios'
import { ref, getCurrentInstance, onMounted } from 'vue'
// import type { UploadProps, UploadUserFile } from 'element-plus'
const vm = getCurrentInstance().proxy
onMounted(() => {
  getQueryData()
})
function getQueryData() {
  const queryData = vm.$route.query
  console.log(queryData)
}
const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])
function handleChange(file, fileList) {
  console.log(file, fileList)
}
function handleUpload() {
  vm.$refs.uploadRef.submit()
}
function uploadFile(file) {
  let param = new FormData()
  param.append('multipartFile', file.file, file.name)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  console.log(file, 111111111)
  console.log(param, 2222222)
  return request
    .post(file.action, param, config)
    .then((res) => {
      return Promise.resolve(res, file)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}
</script>
<style lang="less" scoped>
.upload-file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :deep(.el-upload) {
    width: 200px;
    border: 1px dashed #ccc;
    border-radius: 10px;
  }
}
</style>
