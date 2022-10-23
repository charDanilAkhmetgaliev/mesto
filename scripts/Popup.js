export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupButton = this._popup.querySelector('.popup__close-button');
    }

    _handleEscClose = () => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        if (this._popup.classList.contains('popup__opened')) {
            document.addEventListener('keydown', this._handleEscClose.bind(this));
            this._closePopupButton.addEventListener('click', this.close.bind(this));
            this._popup.addEventListener('click', () => this.close.bind(this));
        } else {
            document.removeEventListener('keydown', this._handleEscClose.bind(this));
        }
    }

    open = () => {
        this._popup.classList.add('popup__opened');
        this.setEventListeners();
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        this.setEventListeners();
    }
}