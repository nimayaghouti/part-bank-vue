import instance, { setToken } from '@/helper/apiHelper'

export const deleteDeposite = async (token) => {
  try {
    setToken(token)
    const response = await instance.delete('/deposit-account')
    return response
  } catch (error) {
    console.error(error)
  }
}
