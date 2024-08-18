import axios from 'axios'
import useShowToast from '@/composables/useShowToast'
import useButtonLoading from '@/composables/useButtonLoading'

// real base url
const BASE_URL = 'https://college.apipart.ir'

// base url for test with json server mock data
// const BASE_URL = 'http://localhost:3000';

let authToken = ''

const { showButtonLoading } = useButtonLoading()
const { showToast } = useShowToast()

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000
  // headers: {
  //   'gateway-system': 'turboFront',
  //   'gateway-token': authToken
  // },
  // maxBodyLength: Infinity
})

instance.interceptors.request.use(
  (config) => {
    showButtonLoading(true)
    config.headers = {
      'gateway-system': 'turboFront',
      'gateway-token': authToken
    }
    config.maxBodyLength = Infinity
    return config
  },
  (error) => {
    showButtonLoading(false)
    showToast({
      mode: 'error',
      message: error.response.data.data.message?.fa
    })
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // showToast({
    //   mode: 'success',
    //   message: response.data.data.message?.fa || 'با موفقیت انجام شد'
    // })
    return response
  },
  (error) => {
    showToast({
      mode: 'error',
      message: error.response.data.data.message?.fa
    })
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    showButtonLoading(false)
    return response
  },
  (error) => {
    showButtonLoading(false)
    return Promise.reject(error)
  }
)

export const setToken = (token) => {
  authToken = token
}

export default instance
