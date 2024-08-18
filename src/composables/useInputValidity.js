import { ref } from 'vue'

const useInputValidity = (inputNames) => {
  const keysWithEmptyString = {}
  const keysWithFalse = {}

  inputNames.forEach((name) => {
    keysWithEmptyString[name] = ''
    keysWithFalse[name] = false
  })

  const inputsValues = ref(keysWithEmptyString)
  const inputsValidities = ref(keysWithFalse)

  const isDisabled = ref(true)
  const setIsDisabled = (isAllValid) => {
    isDisabled.value = !isAllValid
  }

  const setInputsValuesAndValidities = (innerValue, field) => {
    inputsValues.value[field] = innerValue.textfieldValue
    inputsValidities.value[field] = innerValue.isValid

    const isAllValid = Object.values(inputsValidities).every((value) => value === true)
    setIsDisabled(isAllValid)
  }

  return {
    inputsValues,
    inputsValidities,
    setInputsValues: setInputsValuesAndValidities,
    isDisabled
  }
}

export default useInputValidity
