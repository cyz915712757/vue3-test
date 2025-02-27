import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 导出一个名为useCounterStore的常量，该常量是一个defineStore函数的返回值
export const userInfoStore = defineStore('userInfo', () => {
  // 定义一个名为count的ref变量，初始值为0
  const user = ref({
    name: '张三',
    age: 18,
    id: '1234567890',
    // id: '',
  })
  const isLogin = computed(() => {
    return user.value.id
  })
  // 定义一个名为doubleCount的computed变量，其值为count.value * 2
  // const doubleCount = computed(() => count.value * 2)

  // 返回一个包含count、doubleCount和increment的对象
  return { user, isLogin }
})
