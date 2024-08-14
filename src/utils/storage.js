export default class DataStorage {
  data
  storage
  dataName

  constructor(data, dataName, storage) {
    this.data = data
    this.dataName = dataName
    this.storage = storage
  }

  setItem() {
    // save()
    this.storage.setItem(this.dataName, this.data)
  }

  getItem() {
    // load()
    const storedData = this.storage.getItem(this.dataName)
    if (storedData) {
      return storedData
    } else {
      return { message: 'no data!' }
    }
  }

  removeItem() {
    // remove
    this.storage.removeItem('userData')
    this.data = null
  }

  clear() {
    // clearStorage
    this.storage.clear()
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

  clear() {
    throw new Error("Method 'clear()' must be implemented.")
  }
}

export class CustomLocalStorage extends BaseStorage {
  constructor() {
    super()
    this.encrypting = new CustomBase64Securing()
  }

  setItem(key, value) {
    const encryptedValue = this.encrypting.encrypt(value)
    localStorage.setItem(key, encryptedValue)

    // [debug] set pure data
    // localStorage.setItem(key, JSON.stringify(value))
  }

  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? this.encrypting.decrypt(value) : null

    // [debug] get pure data
    // return value ? JSON.parse(value) : null
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export class CustomSessionStorage extends BaseStorage {
  constructor() {
    super()
    this.encrypting = new CustomBase64Securing()
  }

  setItem(key, value) {
    const encryptedValue = this.encrypting.encrypt(value)
    sessionStorage.setItem(key, encryptedValue)

    // [debug] set pure data
    // localStorage.setItem(key, JSON.stringify(value))
  }

  getItem(key) {
    const value = sessionStorage.getItem(key)
    return value ? this.encrypting.decrypt(value) : null

    // [debug] get pure data
    // return value ? JSON.parse(value) : null
  }

  removeItem(key) {
    sessionStorage.removeItem(key)
  }

  clear() {
    sessionStorage.clear()
  }
}
