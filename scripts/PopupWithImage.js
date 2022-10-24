import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  log() {
    console.log(this._popup);
  }

  _setData(cardName, cardLink) {
    this._popup.querySelector('.popup__image').src = cardLink;
    this._popup.querySelector('.popup__image').alt = `Изображение ${cardName}`;
    this._popup.querySelector('.popup__label').textContent = cardName;
  }

  open = (cardName, cardLink) => {
    this._setData(cardName, cardLink);
    super.open();
  }

  // close = () => {
  //   super.close();
  // }
}
