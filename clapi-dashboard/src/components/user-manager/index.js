const userDataKey = 'user-data';

export default class UserManager {
  static setUserDetails = (data) => {
    data && localStorage.setItem(userDataKey, JSON.stringify(data));
  }

  static getUserDetails = () => {
    const userDetail = localStorage.getItem(userDataKey);
    return userDetail ? JSON.parse(userDetail) : null;
  }

  static clearUserDetails = () => {
    localStorage.clear();
  }
}