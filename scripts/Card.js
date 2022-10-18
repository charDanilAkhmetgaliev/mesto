export default class Card {
  constructor(cardDataName, cardDataLink, cardSelector) {
    this._cardImageLink = cardDataLink;
    this._cardName = cardDataName;
    this._cardSelector = cardSelector;
  }
  // метод добавляет слушатель к кнопке лайка
  _addToggleLikeListener() {
    this._likeCardButton = this._card.querySelector('.card__like');
    this._likeCardButton.addEventListener('click', () => this._toggleLike());
  }
  // метод переключает состояния лайка
  _toggleLike() {
    this._likeCardButton.classList.toggle('card__like_active');
  }
  // метод добавляет слушатель к кнопке удаления карточки
  _addDeleteCardListener() {
    this._deleteCardButton = this._card.querySelector('.card__delete-button');
    this._deleteCardButton.addEventListener('click', () => this._deleteCard());
  }
  // метод удаляет карточку
  _deleteCard() {
    this._card.remove();
  }
  // метод создает карточку
  _createCard() {
    this._template = document.querySelector(`${this._cardSelector}`).content.querySelector('.card');
    this._card = this._template.cloneNode(true);
    this.cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');

    this._cardTitle.textContent = this._cardName;
    this.cardImage.src = this._cardImageLink;
    this.cardImage.alt = `Изображение ${this._cardName}`;
  }

  createCardHandler() {
    this._createCard();

    this._addToggleLikeListener(this._card);

    this._addDeleteCardListener(this._card);

    return this._card;
  }
}
