<template>
  <div class="data-set-page">
    <p>create 创建数据页面</p>
    <UploadFile />
    <div class="select-person">
      <el-button @click="selectPerson">选择人员</el-button>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import UploadFile from '@/components/CreateData/UploadFile.vue'
import { userInfoStore } from '@/stores/userInfo'
// import type { UploadProps, UploadUserFile } from 'element-plus'
const vm = getCurrentInstance().proxy
const userInfo = userInfoStore()

onMounted(() => {
  qing.config({
    jsApiList: ['selectPersons', 'selectOrgs', 'selectRoles'],
    token: {
      type: 'websession',
      value: '',
    },
  })
  console.log(userInfo, 'userInfo')
  getQueryData()
})

function getQueryData() {
  const queryData = vm.$route.query
  console.log(queryData)
}
function selectPerson() {
  const openId = []
  console.log(qing, 1111111)
  qing.call('selectPersons', {
    isMulti: true, // 是否多选true-多选，false-单选
    maxSelect: 2000, // 最大选中人数,默认2000
    isShowJobTitle: true, // 是否显示职位桥选项， true-显示，false-隐藏
    selected: openId,
    isShowEcosphere: false,
    isShowExt: false,
    success(res) {
      if (res.success) {
        const { data } = res // data为选中人员列表数据
        const { persons } = data
        // that.dealPersonData(persons)
      }
    },
    error(err) {
      console.log(err, 3333333)
    },
  })
}
</script>

<style lang="less" scoped>
.data-set-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
