import { likeButtonSelector,
  likeActiveSelector,
  activeDelCardButtonSelector,
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardLikesCountSelector,
  cardDelButtonSelector
} from '../utils/constants.js'

export default class Card {
  constructor({ cardData, templateSelector, handleCardClick, cardDelPopup, doLike, delLike }) {
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
    this._dataTemplateElement = document.querySelector(`${templateSelector}`).content;
    this._cardUserId = cardData.owner._id;
    this._cardDelPopup = cardDelPopup;
    this._handleDoLike = doLike;
    this._handleDelLike = delLike;
    this._isLiked = false;
  }

  // метод добавляет слушатель к кнопке лайка
  _addToggleLikeListener() {
    this._cardLikeButton.addEventListener('click', () => {
      this._processDoLike().then(this._toggleLike())
        .catch(err => console.log(err));
    });
  }

  _checkLiked() {
    this._cardLikes.forEach(like => {
      if (Object.is(like._id, this._userId) && this._cardLikes.length > 0) {
        return this._isLiked = true;
      }
    })
  }

  _toggleLike() {
    this._cardLikeButton.classList.toggle(likeActiveSelector);
  }

  _processDoLike() {
    if (this._isLiked) {
      return this._handleDelLike(this._cardData._id)
    } else {
      return this._handleDoLike(this._cardData._id)
    }
  }

  _processRenderLike() {
    this._cardLikesCount = this._card.querySelector(cardLikesCountSelector);
    this._cardLikesCount.textContent = this._cardLikes.length;
    if (this._isLiked) {
      this._toggleLike();
    }
  }

  _processDelCardButton() {
    if (Object.is(this._cardUserId, this._userId)) {
      this._cardDeleteButton.classList.add(activeDelCardButtonSelector);
      this._cardDeleteButton.addEventListener('click', () => this._cardDelPopup.open(this._cardData._id));
    }
  }

  // метод клонирует новый карточный элемент и наполняет его содержимым
  _buildCardContent() {
    this._cardElement = this._dataTemplateElement.querySelector(cardSelector);
    this._card = this._cardElement.cloneNode(true);
    this.cardImage = this._card.querySelector(cardImageSelector);
    this._cardTitle = this._card.querySelector(cardTitleSelector);
    this._cardDeleteButton = this._card.querySelector(cardDelButtonSelector);
    this._cardLikes = this._cardData.likes;
    this._cardLikeButton = this._card.querySelector(likeButtonSelector);
    this._checkLiked();

    this._processDelCardButton();

    this._cardTitle.textContent = this._cardData.name;
    this.cardImage.src = this._cardData.link;
    this.cardImage.alt = `Изображение ${this._cardData.name}`;
    this._processRenderLike();

    this.cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  // метод создает карточку
  createCard(userId) {
    this._userId = userId;
    this._buildCardContent();

    this._addToggleLikeListener();

    return this._card;
  }
}
