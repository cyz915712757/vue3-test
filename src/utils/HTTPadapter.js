import axios from 'axios'
import { ElMessage } from 'element-plus'
import { userInfoStore } from '@/stores/userInfo'

let myRequester = null
let myResponser = null
axios.defaults.timeout = 8000
function initInterceptors() {
  // 确保重新初始化拦截器之前，生成全新的promise对象
  const source = axios.CancelToken.source()
  //   重新初始化拦截器之前，先移除旧的拦截器
  if (myRequester !== null && myResponser !== null) {
    axios.interceptors.request.eject(myRequester)
    axios.interceptors.response.eject(myResponser)
  }
  // 添加请求拦截器
  myRequester = axios.interceptors.request.use((config) => {
    const userInfo = userInfoStore()
    const cfg = config
    // 当某个接口有自定义的cancelToken时，则使用该token，不赋值 cfg.cancelToken = source.token
    if (!cfg.cancelToken) {
      cfg.cancelToken = source.token
      cfg.source = source
    }
    const personId = '652244f4e4b076c423b4a05a'
    const eid = '90002660'
    cfg.headers['X-Requested-personId'] = personId
    cfg.headers['X-Requested-eid'] = eid
    // userInfo.personId && (cfg.headers['X-Requested-personId'] = userInfo.personId)
    return cfg
  })
  // 添加响应拦截器
  myResponser = axios.interceptors.response.use(
    (res) => {
      const {
        status,
        data: { success, data, error },
      } = res
      if (status === 200 && success) {
        return data
      }
      if (success === undefined) {
        return res.data
      }
      const errorText = error.constructor === Object ? error?.error : error || '接口请求失败'
      ElMessage.error({
        message: errorText,
        duration: 2000,
        type: 'error',
      })
      return Promise.reject(new Error(error))
    },
    (error) => {
      if (error.message.includes('timeout')) {
        return Promise.reject(new Error('请求超时'))
      }
      error.message = error.message.replace('Error: Network Error', '网络异常')
      return Promise.reject(error)
    },
  )
}
initInterceptors()
