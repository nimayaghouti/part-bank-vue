import { ref } from 'vue'

const isLoading = ref(false)

const useButtonLoading = () => {
  const setIsLoading = (bool) => {
    isLoading.value = bool
  }

  return {
    isButtonLoading: isLoading,
    showButtonLoading: setIsLoading
  }
}

export default useButtonLoading
