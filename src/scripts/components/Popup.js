export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
