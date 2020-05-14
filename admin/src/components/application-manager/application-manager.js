const dataKey = 'app-data'

export default class ApplicationManager {
  static setIsApplicationInitialized = (boolean) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(dataKey, boolean)
    }
  }

  static isApplicationInitialized = () => {
    if (typeof window !== 'undefined') {
      return  window.localStorage.getItem(dataKey) === "true" ? true : false
    }
  }

}
