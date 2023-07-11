import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: '',
  timeout: 10 * 1000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      arrayFormat: 'indices'
    })
  }
})

function getCookie(name) {
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
}

request.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers['token'] = localStorage.getItem("token");
  }
  if (config.method.toLocaleLowerCase() === 'post') {
    if(!config.headers['Content-Type'] || config.headers['Content-Type'] === 'application/json'){
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      // config.headers['X-CSRFToken'] = getCookie('csrftoken');
      config.data = qs.stringify(config.data, { allowDots: true });
    }
  }
  return config
})

request.interceptors.response.use(
  response => {
    const { data, config } = response
    // if (response && response.status === 200) {
      return response.data
    // } else {
    //   if (!config.noErrorMessage) {
    //     message.error(data?.msg || '请求失败')
    //   }
    //   if (data && data.status === '501') {
    //     location.hash = '#/login'
    //     return Promise.reject(data)
    //   } else {
    //     return Promise.reject(data)
    //   }
    // }
  },
  error => {
    const config = error?.response?.data
    if (!config || !config.noErrorMessage) {
      message.error(error?.response?.data?.error || 'request failure')
    }
    return Promise.reject(error)
  }
)


export default request