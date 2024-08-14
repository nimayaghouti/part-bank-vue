export default class StorageData {
  #data
  #storage
  #dataName

  constructor(data, dataName, storage) {
    this.#data = data
    this.#dataName = `${dataName}Data`
    this.#storage = storage
  }

  save() {
    this.#storage.setItem(this.#dataName, this.#data)
  }

  load() {
    const storedData = this.#storage.getItem(this.#dataName)
    if (storedData) {
      return storedData
    } else {
      return { message: 'no data!' }
    }
  }

  clear() {
    this.#storage.removeItem('userData')
    this.#data = null
  }

  clearStorage() {
    this.#storage.clearStorage()
  }
}

//////////////////////////////////////////////////////////////////

class BaseSecuring {
  encrypt(value) {
    throw new Error("Method 'encrypt()' must be implemented.")
  }

  decrypt(value) {
    throw new Error("Method 'decrypt()' must be implemented.")
  }
}

class CustomBase64Securing extends BaseSecuring {
  encrypt(value) {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
    const encoder = new TextEncoder()
    const uint8Array = encoder.encode(stringValue)
    return btoa(String.fromCharCode(...uint8Array))
  }

  decrypt(value) {
    try {
      const decoded = atob(value)
      const uint8Array = new Uint8Array(decoded.split('').map((char) => char.charCodeAt(0)))
      const decoder = new TextDecoder()
      const decodedString = decoder.decode(uint8Array)
      if (decodedString.startsWith('{') || decodedString.startsWith('[')) {
        return JSON.parse(decodedString)
      } else {
        return decodedString
      }
    } catch (error) {
      console.error('Error in decrypting value:', error)
      return null
    }
  }
}

//////////////////////////////////////////////////////////////////

class BaseStorage {
  setItem(key, value) {
    throw new Error("Method 'setItem()' must be implemented.")
  }

  getItem(key) {
    throw new Error("Method 'getItem()' must be implemented.")
  }

  removeItem(key) {
    throw new Error("Method 'removeItem()' must be implemented.")
  }

  clearStorage() {
    throw new Error("Method 'clearStorage()' must be implemented.")
  }
}

class CustomLocalStorage extends BaseStorage {
  constructor() {
    super()
    this.encrypting = new CustomBase64Securing()
  }

  setItem(key, value) {
    const encryptedValue = this.encrypting.encrypt(value)
    localStorage.setItem(key, encryptedValue)
  }

  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? this.encrypting.decrypt(value) : null
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  clearStorage() {
    localStorage.clear()
  }
}

class CustomSessionStorage extends BaseStorage {
  constructor() {
    super()
    this.encrypting = new CustomBase64Securing()
  }

  setItem(key, value) {
    const encryptedValue = this.encrypting.encrypt(value)
    sessionStorage.setItem(key, encryptedValue)
  }

  getItem(key) {
    const value = sessionStorage.getItem(key)
    return value ? this.encrypting.decrypt(value) : null
  }

  removeItem(key) {
    sessionStorage.removeItem(key)
  }

  clearStorage() {
    sessionStorage.clear()
  }
}

/////////////////////////////////

// let localUser

// const setUserDataToLocalStorage = (data) => {
//   const userData = {
//     firstName: data.firstName,
//     lastName: data.lastName,
//     idNumber: data.idNumber,
//     token: data.token,
//     refreshToken: data.refreshToken,
//     phoneNumber: data.phoneNumber
//   }

//   localUser = new StorageData(userData, 'userData', new CustomLocalStorage())
//   localUser.save()
// }

// const getUserDataFromLocalStorage = () => {
//   const encrypting = new CustomBase64Securing()
//   const decrypted = encrypting.decrypt(localStorage.getItem('userData'))
//   return decrypted
// }

// export { setUserDataToLocalStorage, getUserDataFromLocalStorage }
