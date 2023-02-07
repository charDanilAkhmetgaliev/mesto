import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._handleSubmit = submitForm;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      super.renderLoading(true)
      this._handleSubmit(this._cardId)
      .then(() => this.close())
      .catch(err => console.log(err))
      .finally(() => super.renderLoading(false));
    })
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
}
