export default class Card {
  constructor(cardDataName, cardDataLink, cardSelector) {
    this._cardImageLink = cardDataLink;
    this._cardName = cardDataName;
    this._cardSelector = cardSelector;
  }
  // метод добавляет слушатель к кнопке лайка
  _addToggleLikeListener() {
    this._likeCardButton = this.card.querySelector('.card__like');
    this._likeCardButton.addEventListener('click', () => this._toggleLike());
  }
  // метод переключает состояния лайка
  _toggleLike() {
    this._likeCardButton.classList.toggle('card__like_active');
  }
  // метод добавляет слушатель к кнопке удаления карточки
  _addDeleteCardListener() {
    this._deleteCardButton = this.card.querySelector('.card__delete-button');
    this._deleteCardButton.addEventListener('click', () => this._deleteCard());
  }
  // метод удаляет карточку
  _deleteCard() {
    this.card.remove();
  }
  // метод создает карточку
  _createCard() {
    this._template = document.querySelector(`${this._cardSelector}`).content.querySelector('.card');
    this.card = this._template.cloneNode(true);
    this.cardImage = this.card.querySelector('.card__image');
    this._cardTitle = this.card.querySelector('.card__title');

    this._cardTitle.textContent = this._cardName;
    this.cardImage.src = this._cardImageLink;
    this.cardImage.alt = `Изображение ${this._cardName}`;
  }

  createCardHandler() {
    this._createCard();

    this._addToggleLikeListener(this.card);

    this._addDeleteCardListener(this.card);

    return this.card;
  }
}
