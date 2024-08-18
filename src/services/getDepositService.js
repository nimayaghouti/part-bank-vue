import instance, { setToken } from '@/helper/apiHelper'

export const getDepositAccount = async (token) => {
  try {
    setToken(token)
    const { data } = await instance.get('/deposit-account')
    // return data.data.result.id ? true : false
    return data.data.result
  } catch (error) {
    console.error(error)
  }
}
