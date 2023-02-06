import {
  userNameSelector,
  userInfoSelector,
  userAvatarSelector
 } from "../utils/constants.js";

export default class UserInfo {
  constructor() {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData.name = this._userNameElement.textContent;
    this._userData.about = this._userInfoElement.textContent;

    return this._userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
    this._userAvatar.src = avatar;
  }
}
