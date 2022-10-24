export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    if (this._popup.classList.contains('popup_opened')) {
      document.addEventListener('keydown', this._handleEscClose.bind(this));
      this._closePopupButton.addEventListener('click', this.close);
      this._popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup')) {
          this.close();
        }
      });
    } else {
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close = () => {
    this._popup.classList.remove('popup_opened');
    this.setEventListeners();
  }
}
