export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userNameElement.textContent;
    this._userData.status = this._userInfoElement.textContent;

    return this._userData;
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.name;
    this._userInfoElement.textContent = userData.status;
  }
}
