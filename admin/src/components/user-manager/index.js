const userDataKey = 'user-data'

export default class UserManager {
  static setUserDetails = (data) => {
    if (typeof window !== 'undefined') {
      data && window.localStorage.setItem(userDataKey, JSON.stringify(data))
    }
  }

  static getUserDetails = () => {
    if (typeof window !== 'undefined') {
      const userDetail = window.localStorage.getItem(userDataKey)
      return userDetail ? JSON.parse(userDetail) : null
    }
  }

  static clearUserDetails = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  }
}
