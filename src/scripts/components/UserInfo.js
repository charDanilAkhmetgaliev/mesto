export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userNameElement.textContent;
    this._userData.about = this._userInfoElement.textContent;

    return this._userData;
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
  }
}
