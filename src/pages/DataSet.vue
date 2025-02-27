<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentInstance } from 'vue'
import { userInfoStore } from '@/stores/userInfo'
import api from '@/api/dataset.js'
import axios from 'axios'
const vm = getCurrentInstance().proxy
const userInfo = userInfoStore()
console.log(userInfo.user, 'userInfo1111111')
const list = ref([])
onMounted(async () => {
  await handleGetList()
})
async function handleGetList() {
  try {
    const params = {
      ticket: 'APPURLWITHTICKET05bbc3b0d8b3f71b80fb198607f30c4b',
    }
    const res = await api.getFusionList(params)
    // const res = axios.get(' https://mock.mengxuegu.com/mock/6073ddba56076a4a764845d9/example')
    list.value = res.data
  } catch (error) {
    console.log(error)
  }
}
function handleSetData() {
  vm.$router.push({
    path: '/createData',
    query: {
      id: 1,
    },
  })
  console.log(vm, 'set data')
}
</script>

<template>
  <div class="data-set-page">div.a</div>
  <div class="data-set-page">数据集页面{{ userInfo }}</div>
  <button @click="handleSetData">创建数据集</button>
  <el-button @click="handleGetList">获取数据数据集</el-button>
</template>
