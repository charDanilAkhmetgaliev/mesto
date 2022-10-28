export default class Card {
  constructor(cardData, cardSelector, handleCardClick, initialCards) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._initialCards = initialCards;
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
    this._initialCards.forEach((cardData, cardDataIndex) => {
      if (cardData.name === this._cardData.name && cardData.link === this._cardData.link) {
        this._initialCards.splice(cardDataIndex, 1);
      }
    });
  }
  // метод создает карточку
  _createCard() {
    this._template = document.querySelector(`${this._cardSelector}`).content.querySelector('.card');
    this._card = this._template.cloneNode(true);
    this.cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');

    this._cardTitle.textContent = this._cardData.name;
    this.cardImage.src = this._cardData.link;
    this.cardImage.alt = `Изображение ${this._cardData.name}`;

    this.cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link));
  }

  createCardHandler() {
    this._createCard();

    this._addToggleLikeListener(this._card);

    this._addDeleteCardListener(this._card);

    return this._card;
  }
}
