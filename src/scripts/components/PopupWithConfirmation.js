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
      this._handleSubmit(this._cardId);
    })
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
}
