import { createRouter, createWebHistory } from 'vue-router'
import DataSet from '../pages/DataSet.vue'
import { userInfoStore } from '@/stores/userInfo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/ai',
  routes: [
    {
      path: '/',
      name: 'dataSet',
      component: DataSet,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue'),
    },
    {
      path: '/createData',
      name: 'createData',
      component: () => import('../pages/CreateData.vue'),
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/IndexView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue'),
    },
  ],
})
const whiteList = ['/login']
router.beforeEach((to, from) => {
  const userInfo = userInfoStore()
  if (whiteList.indexOf(to.path) !== -1) {
    return true
  }
  // 没有登录，跳转到登录页
  if (!userInfo.isLogin) {
    return { path: '/login' }
  }
  if (to.path === '/about') {
    return { path: '/login' }
  }
  return true
})

export default router
