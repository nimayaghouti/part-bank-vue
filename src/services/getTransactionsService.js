import instance, { setToken } from '@/helper/apiHelper'

export const getTransaction = async (token) => {
  try {
    setToken(token)
    const { data } = await instance.get('/transactions')
    const transactionsArray = data.data.results
    // console.log(transactionsArray);
    return transactionsArray
  } catch (error) {
    console.error(error)
  }
}
