import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import i18n from '@/lang'
import Cookies from 'js-cookie'
import { myMessage } from '@/plugins/resetMessage'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '200') {
      if (res.code === '401') {
        console.log(i18n.t('remindMessage.expired'))
        myMessage({
          message: i18n.t('remindMessage.expired') || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        Cookies.remove('Admin-Token')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        if (res.code !== '501') {
          myMessage({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        return Promise.reject(res)
      }
    } else {
      if (response.config.method !== 'get') {
        myMessage({
          message: i18n.t('remindMessage.success') || 'Success',
          type: 'success',
          duration: 3 * 1000
        })
      }
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    myMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
