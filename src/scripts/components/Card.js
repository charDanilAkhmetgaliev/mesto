export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    // this._cardSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._dataTemplateElement = document.querySelector(`${templateSelector}`).content;
  }

  // метод добавляет слушатель к кнопке лайка
  _addToggleLikeListener() {
    this._cardLikeButton = this._card.querySelector('.card__like');
    this._cardLikeButton.addEventListener('click', () => this._toggleLike());
  }
  // метод переключает состояния лайка
  _toggleLike() {
    this._cardLikeButton.classList.toggle('card__like_active');
  }
  // метод добавляет слушатель к кнопке удаления карточки
  _addDeleteCardListener() {
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._cardDeleteButton.addEventListener('click', () => this._deleteCard());
  }
  // метод удаляет карточку
  _deleteCard() {
    this._card.remove();
  }
  // метод клонирует новый карточный элемент и наполняет его содержимым
  _buildCardContent() {
    this._cardElement = this._dataTemplateElement.querySelector('.card');
    this._card = this._cardElement.cloneNode(true);
    this.cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');

    this._cardTitle.textContent = this._cardData.name;
    this.cardImage.src = this._cardData.link;
    this.cardImage.alt = `Изображение ${this._cardData.name}`;

    this.cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  // метод создает карточку
  createCard() {
    this._buildCardContent();

    this._addToggleLikeListener();

    this._addDeleteCardListener();

    return this._card;
  }
}
