import instance, { setToken } from '@/services/apiService'

export const useAuthOut = async (token) => {
  try {
    setToken(token)
    const { data } = await instance.post('/auth/logout')
    // console.log('authout', data)

    const isEmpty = Object.keys(data).length === 0
    // console.log('isEmpty', isEmpty)

    if (isEmpty) {
      return '404'
    } else {
      return '200'
    }
  } catch (error) {
    console.error(error)
  }
}
