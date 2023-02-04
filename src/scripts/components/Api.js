export default class Api {
  constructor(url, { userToken, cohortName }) {
    this._url = url;
    this._userToken = userToken;
    this._cohort = cohortName;
  }

  authorizationToServer() {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      headers: {
        'authorization': `${this._userToken}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject('Ошибка авторизации!');
    })
  }

  receiveCardsData() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: {
        'authorization': `${this._userToken}`
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject('[WARNING] Cards not found!');
    })
  }
}