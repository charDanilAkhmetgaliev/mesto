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

  createSimpleRequest(extensionUrl, requestMethod, errorText) {
    this._completeUrl = `${this._url}/${this._cohort}`.concat(extensionUrl);
    return fetch(this._completeUrl, {
      method: requestMethod,
      headers: {
        'authorization': `${this._userToken}`
      }
    })
    .then(response => this._processResponse(response, errorText))
  }

  createBodyRequest(extensionUrl, requestMethod, errorText, bodyData) {
    this._completeUrl = `${this._url}/${this._cohort}`.concat(extensionUrl);
    return fetch(this._completeUrl, {
      method: requestMethod,
      headers: {
        'authorization': `${this._userToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    })
    .then(response => this._processResponse(response, errorText))
  }
}
