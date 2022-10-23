import Popup from './Popup.js';
<<<<<<< HEAD
=======
import { cardPopupImage, cardPopupLabel } from './utils/constants.js';
>>>>>>> be4d9c096ff3e3b329fa092a2e625da0b49c32e0

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._cardImageLink = data.link;
    this._cardName = data.name;
  }

  open = () => {
<<<<<<< HEAD
    super._popup.querySelector('.popup__image').src = this._cardImageLink;
    super._popup.querySelector('.popup__image').alt = `Изображение ${this._cardName}`;
    super._popup.querySelector('.popup__label').textContent = this._cardName;
=======
    cardPopupImage.src = this._cardImageLink;
    cardPopupImage.alt = `Изображение ${this._cardName}`;
    cardPopupLabel.textContent = this._cardName;
>>>>>>> be4d9c096ff3e3b329fa092a2e625da0b49c32e0
  
    super.open();
  }
}