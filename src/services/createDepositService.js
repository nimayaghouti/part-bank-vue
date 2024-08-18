import instance, { setToken } from '@/helper/apiHelper'

export const postCreateDeposit = async (token, userPersonalInfo) => {
  try {
    setToken(token)
    const response = await instance.post('/deposit-account', userPersonalInfo)
    return response
  } catch (error) {
    console.error(error)
  }
}
