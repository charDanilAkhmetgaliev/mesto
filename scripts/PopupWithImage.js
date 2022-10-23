import Popup from './Popup.js';
import { cardPopupImage, cardPopupLabel } from './utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._cardImageLink = data.link;
    this._cardName = data.name;
  }

  open = () => {
    cardPopupImage.src = this._cardImageLink;
    cardPopupImage.alt = `Изображение ${this._cardName}`;
    cardPopupLabel.textContent = this._cardName;
  
    super.open();
  }
}