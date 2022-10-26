export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._closePopupButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    console.log('я супер');
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
