class Card {
  constructor(data, cardSelector) {
    this._cardImageLink = data.link;
    this._cardName = data.name;
    this._cardSelector = cardSelector;
  }

  _toggleLike(card) {
    this._likeCardButton = card.querySelector('.card__like');
    _likeCardButton.addEventListener('click', () => _likeCardButton.classList.toggle('card__like_active'));
  }

  _deleteCard(card) {
    this._deleteCardButton = card.querySelector('.card__delete-button');
    _deleteCardButton.addEventListener('click', () => card.remove());
  }

  createCard() {
    this._template = document.querySelector(`${this._cardSelector}`).content.querySelector('.card');
    this._card = template.cloneNode(true);
    this._cardImage = template.querySelector('.card__image');
    this._cardTitle = template.querySelector('.card__title');

    this._cardTitle.textContent = this._cardName;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = `Изображение ${this._cardName}`;

    this._toggleLike(this._card);

    this._deleteCard(this._card);

    return this._card;
  }
}
