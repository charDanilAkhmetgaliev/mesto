import { likeButtonSelector,
  likeActiveSelector,
  activeDelCardButtonSelector,
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardLikesCountSelector,
  cardDelButtonSelector
} from '../utils/constants.js'
import {logPlugin} from "@babel/preset-env/lib/debug";

export default class Card {
  constructor({ cardData, templateSelector, handleOpenImage, doLike, delLike, handleOpenDelPopup }) {
    this._cardData = cardData;
    this._cardUserId = cardData.owner._id;
    this._handleDoLike = doLike;
    this._handleDelLike = delLike;
    this._handleOpenDelPopup = handleOpenDelPopup;
    this._handleOpenImage = handleOpenImage;

    this._dataTemplateElement = document.querySelector(`${templateSelector}`).content;
    this._cardElement = this._dataTemplateElement.querySelector(cardSelector);
    this._card = this._cardElement.cloneNode(true);
    this._cardImage = this._card.querySelector(cardImageSelector);
    this._cardTitle = this._card.querySelector(cardTitleSelector);
    this._cardDeleteButton = this._card.querySelector(cardDelButtonSelector);
    this._cardLikeButton = this._card.querySelector(likeButtonSelector);
    this._cardLikesCount = this._card.querySelector(cardLikesCountSelector);

    this._cardLikes = this._cardData.likes;
    this._cardLikesCount.textContent = this._cardLikes.length;

    this._isLiked = false;
  }

  _addEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleOpenImage(this._cardData));

    this._cardDeleteButton.addEventListener('click', () => this._handleOpenDelPopup(this._cardData._id))

    this._cardLikeButton.addEventListener('click', () => {
      this._processDoLike()
        .then(this._toggleLike())
        .catch(err => console.log(err));
    });
  }


  _checkLikedMe(userId) {
    this._cardLikes.forEach(like => {
        this._isLiked = (this._cardLikes.length > 0 && Object.is(like._id, userId)) ? true : false;
    })
    if (this._isLiked) {
      this._toggleLike();
    }
  }

  _checkUser(userId) {
    this._userMe = (Object.is(this._cardUserId, userId)) ? true : false;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _processDoLike() {
    if (this._isLiked) {
      this._cardLikesCount.textContent = --this._cardLikesCount.textContent;
      this._isLiked = false;
      return this._handleDelLike(this._cardData._id)
    } else {
      this._cardLikesCount.textContent = ++this._cardLikesCount.textContent;
      this._isLiked = true;
      return this._handleDoLike(this._cardData._id)
    }
  }

  _toggleLike() {
    this._cardLikeButton.classList.toggle(likeActiveSelector);
  }

  _addDelCardButton() {
    if (this._userMe) {
      this._cardDeleteButton.classList.add(activeDelCardButtonSelector);
    }
  }

  _setCardData() {
    this._cardTitle.textContent = this._cardData.name;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = `Изображение ${this._cardData.name}`;
    this._addDelCardButton();
  }

  createCard(userId) {
    this._checkUser(userId);
    this._checkLikedMe(userId);
    this._setCardData();
    this._addEventListeners();

    return this._card;
  }
}
