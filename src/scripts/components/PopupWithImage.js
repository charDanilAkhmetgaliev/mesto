import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupLabel = this._popup.querySelector('.popup__label');
  }

  _setData(cardName, cardLink) {
    this._popupImage.src = cardLink;
    this._popupImage.alt = `Изображение ${cardName}`;
    this._popupLabel.textContent = cardName;
  }

  open = (cardData) => {
    this._setData(cardData.name, cardData.link);
    super.open();
  }
}
