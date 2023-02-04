export default class Api {
  constructor(url, { userToken, cohortName }) {
    this._url = url;
    this._userToken = userToken;
    this._cohort = cohortName;
  }

  _processResponse(response, error) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(error);
  }

  authorizationToServer() {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      headers: {
        'authorization': `${this._userToken}`
      }
    })
    .then(response => this._processResponse(response, 'Ошибка авторизации'))
  }

  receiveCardsData() {
    return fetch(`${this._url}/${this._cohort}/cards`, {
      headers: {
        'authorization': `${this._userToken}`
      }
    })
    .then(response => this._processResponse(response, 'Cards not found'))
  }

  updateUserData(name, about) {
    return fetch(`${this._url}/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `${this._userToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(response => this._processResponse(response, 'Ошибка обновления профиля'))
  }
}