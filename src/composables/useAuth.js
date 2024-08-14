import instance from '@/services/apiService'

export const useAuth = async (phoneNumber, password) => {
  try {
    // real endpoint
    const response = await instance.post('/auth/login', {
      phoneNumber,
      password
    })

    // endpoint for test with json server mock data
    // const response = await instance.post('/auth', {
    //   phoneNumber,
    //   password,
    // });

    console.log('Login successful', response.data.data)
    return {
      ...response.data.data,
      phoneNumber: phoneNumber
    }
  } catch (error) {
    console.error('Login failed', error)
    throw error
  }
}
