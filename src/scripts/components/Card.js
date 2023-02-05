export default class Card {
  constructor(cardData, templateSelector, handleCardClick, cardDeletePopup) {
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
    this._dataTemplateElement = document.querySelector(`${templateSelector}`).content;
    this._cardDeletePopup = cardDeletePopup;
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
    this._cardDeleteButton.addEventListener('click', () => this._cardDeletePopup.open());
  }
  // метод удаляет карточку
  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  // метод клонирует новый карточный элемент и наполняет его содержимым
  _buildCardContent() {
    this._cardElement = this._dataTemplateElement.querySelector('.card');
    this._card = this._cardElement.cloneNode(true);
    this.cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardLikesCount = this._card.querySelector('.card__likes-count');

    this._cardTitle.textContent = this._cardData.name;
    this.cardImage.src = this._cardData.link;
    this.cardImage.alt = `Изображение ${this._cardData.name}`;
    this._cardLikesCount.textContent = this._cardData.likes.length;

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
