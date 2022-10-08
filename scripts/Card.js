export default class Card {
  constructor(data, cardSelector) {
    this._cardImageLink = data.link;
    this._cardName = data.name;
    this._cardSelector = cardSelector;
  }
// функция переключает состояния лайка
  _toggleLike(card) {
    this._likeCardButton = this.card.querySelector('.card__like');
    this._likeCardButton.addEventListener('click', () => this._likeCardButton.classList.toggle('card__like_active'));
  }
// функция удаляет карточку
  _deleteCard(card) {
    this._deleteCardButton = this.card.querySelector('.card__delete-button');
    this._deleteCardButton.addEventListener('click', () => this.card.remove());
  }
// функция создает карточку
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

    this._toggleLike(this.card);

    this._deleteCard(this.card);

    return this.card;
  }
}
