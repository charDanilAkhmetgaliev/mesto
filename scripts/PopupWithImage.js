import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._cardImageLink = data.link;
    this._cardName = data.name;
  }

  open = () => {
    super._popup.querySelector('.popup__image').src = this._cardImageLink;
    super._popup.querySelector('.popup__image').alt = `Изображение ${this._cardName}`;
    super._popup.querySelector('.popup__label').textContent = this._cardName;

    super.open();
  }
}
