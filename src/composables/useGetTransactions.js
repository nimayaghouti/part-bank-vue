import instance, { setToken } from '@/services/apiService'

export const getTransaction = async (token) => {
  setToken(token)
  const { data } = await instance.get('/transactions')
  const transactionsList = data.data.results
  // console.log(transactionsList);
  return transactionsList
}
