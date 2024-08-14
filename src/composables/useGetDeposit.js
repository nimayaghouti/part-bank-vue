import instance, { setToken } from '@/services/apiService'

export const hasDepositAccount = async (token) => {
  setToken(token)
  const { data } = await instance.get('/deposit-account')
  return data.data.result.id ? true : false
}
