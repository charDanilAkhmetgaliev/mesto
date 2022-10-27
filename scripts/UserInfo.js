export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    this._UserData = {};
    this._UserData.name = this._userNameElement.textContent;
    this._UserData.info = this._userInfoElement.textContent;
    console.log(this._UserData);
    return this._UserData;
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.name;
    this._userInfoElement.textContent = userData.status;
  }
}
