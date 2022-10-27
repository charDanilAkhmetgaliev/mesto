export default class UserInfo {
  constructor({ UserNameSelector, UserInfoSelector }) {
    this._userNameElement = document.querySelector(UserNameSelector);
    this._userInfoElement = document.querySelector(UserInfoSelector);
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
    this._userInfoElement.textContent = userData.info;
  }
}
