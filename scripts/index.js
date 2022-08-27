// РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ДАННЫХ ПРОФИЛЯ
// объявление переменных
const editPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const inputName = popup.querySelector('.popup__input_value-type_name');
const inputStatus = popup.querySelector('.popup__input_value-type_status');

<<<<<<< HEAD
const formElement = popup.querySelector('.popup__form');

// универсальная функция открывает попап
=======
let formElement = popup.querySelector('.popup__form');

// Универсальная функция открывает попап
>>>>>>> cae58e2ad17004362e9a0c5f2b8af19625e193f1
function openPopup(popup) {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

// универсальная функция закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}
<<<<<<< HEAD

// функция переносит данные со страницы на сайт
=======
// Функция переносит данные со страницы на сайт
>>>>>>> cae58e2ad17004362e9a0c5f2b8af19625e193f1
function openEventProfilePopup() {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;

  openPopup(popup);
}

// функция переноса данных с попапа на главную страницу
function formSubmitHandler(evt) {
  // отмена отправки данных и перезагрузки страницы после события submit
  evt.preventDefault();
  // перенос значений инпутов на главную страницу-------------
  profileStatus.textContent = inputStatus.value;
  profileName.textContent = inputName.value;
  // вызов функции открытия/закрытия попапа
  closePopup(popup);
}

// универсальная функция привязки события
function tieEvent(event, target, func, param) {
  if (event === 'submit') {
    target.addEventListener(event, func);
  } else {
    target.addEventListener(event, () => func(param));
  }
}

// Привязка события открытия/закрытия попапа к кнопкам
tieEvent('click', editPopupButton, openEventProfilePopup);
tieEvent('click', closePopupButton, closePopup, popup);

// привязка события переноса данных на главную страницу
tieEvent('submit', formElement, formSubmitHandler);

//РЕАЛИЗАЦИЯ АВТОМАТИЧЕСКОГО ДОБАВЛЕНИЯ СТАНДАРТНЫХ КАРТОЧЕК
//Объявление массива данных стандартных карточек
const initialCards = [
  {
    name: 'Кулл-шариф',
    link: './images/kul-sharif.jpg',
    description: 'Изображение мечети Кул Шариф'
  },
  {
    name: 'Казанский Кремль',
    link: './images/kremlin.jpg',
    description: 'Изображение Казанского Кремля'
  },
  {
    name: 'Дворец Земледельцев',
    link: './images/dvorec-zem.jpg',
    description: 'Изображение Дворца Земледельцев'
  },
  {
    name: 'Центр семьи "Казан"',
    link: './images/chasha.jpg',
    description: 'Изображение Центра семьи "Казан"'
  },
  {
    name: 'Памятник Мусе Джалилю',
    link: './images/musa-djalil.jpg',
    description: 'Изображение памятника Мусе Джалилю'
  },
  {
    name: 'Мост "Миллениум"',
    link: './images/millenium.jpg',
    description: 'Изображение моста "Миллениум"'
  }
];
<<<<<<< HEAD

//Объявление переменных
const template = document.querySelector('.template').content;
let cardsList = document.querySelector('.elements__list');
let cardsLikes = cardsList.querySelectorAll('.card__like');

// Функция добавления новых карточек на страницу
=======
//Объявляем переменную содержимого template-элемента
const template = document.querySelector('.template').content;
//Объявляем переменную списка карточек
let cardsList = document.querySelector('.elements__list');
// Функция добавления карточек на страницу
>>>>>>> cae58e2ad17004362e9a0c5f2b8af19625e193f1
function addCard(dataCards) {
  dataCards.reverse().forEach((dataCard) => {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    // перенос данных из инпутов в карточку
    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.description;
    card.querySelector('.card__title').textContent = dataCard.name;

    // привязка события добавления/удаления лайка
    const cardLikeButton = card.querySelector('.card__like');
    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('card__like_active'));
    
    // привязка события удаления карточки
    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => cardDeleteButton.closest('.card').remove());
    
    // функция открытия попапа карточки
    const openedCardPopup = document.querySelector('.popup_opened-card');
    const closeCardPopupButton = openedCardPopup.querySelector('.popup__close-button');
    const openCardPopup = () => {
        const popupImage = openedCardPopup.querySelector('.popup__image');
        popupImage.src = dataCard.link;
        popupImage.alt = dataCard.description;
        openedCardPopup.querySelector('.popup__label').textContent = dataCard.name;
        openPopup(openedCardPopup);
    }
    // привязка события открытия попапа карточки
    tieEvent('click', cardImage, openCardPopup);
    // привязка события закрытия попапа карточки
    tieEvent('click', closeCardPopupButton, closePopup, openedCardPopup);

    // добавление новой карточки в начало
    cardsList.prepend(card);
  });
  activateLike();
}
// Вызов функции добавления стандартных карточек
addCard(initialCards);

<<<<<<< HEAD


// РЕАЛИЗАЦИЯ РУЧНОГО ДОБАВЛЕНИЯ КАРТОЧКИ
// Объявление переменных
const addCardButton = document.querySelector('.profile__add-button');
const addedCardPopup = document.querySelector('.popup_add-card');
const closeCardPopupButton = addedCardPopup.querySelector('.popup__close-button');
const addedCardFormElement = addedCardPopup.querySelector('.popup__form');
const cardName = addedCardPopup.querySelector('.popup__input_value-type_name');
const cardLink = addedCardPopup.querySelector('.popup__input_value-type_link');

// функция очистки инпутов
function clearAddedCardPopup() {
  cardName.value = '';
  cardLink.value = '';
}

// Функция добавления карточки на страницу
function formCardSubmitHandler(evt) {
  evt.preventDefault();
  let newCardData = [];
  function addCardData(cardName, cardLink, cardDescription = 'Изображение места') {
    return newCardData = [
      {
        name: cardName.value,
        link: cardLink.value,
        description: cardDescription
      }
    ];
  }
  addCardData(cardName, cardLink);
=======

//РЕАЛИЗАЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ
// Объявление перемнных
const addCardButton = document.querySelector('.profile__add-button');
let cardPopup = document.querySelector('.popup_card');
const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');
let formCardElement = cardPopup.querySelector('.popup__form');
let cardName = cardPopup.querySelector('.popup__input_value-type_name');
let cardLink = cardPopup.querySelector('.popup__input_value-type_link');

// Функция добавляет карточку на страницу
function formCardSubmitHandler(evt) {
  evt.preventDefault();
  let newCardData = [
    {
      name: cardName.value,
      link: cardLink.value
    }
  ];
>>>>>>> cae58e2ad17004362e9a0c5f2b8af19625e193f1
  addCard(newCardData);
  closePopup(addedCardPopup);
  clearAddedCardPopup();
}

// Привязка события открытия/закрытия попапа к кнопкам
tieEvent('click', addCardButton, openPopup, addedCardPopup);
tieEvent('click', closeCardPopupButton, closePopup, addedCardPopup);

<<<<<<< HEAD
// Привязка события добавления новой карточки
tieEvent('submit', addedCardFormElement, formCardSubmitHandler);
=======
// Событие добавления карточки
formCardElement.addEventListener('submit', formCardSubmitHandler);

// Функция лайка
function activateLike() {
  let cardsLikes = document.querySelectorAll('.card__like');
  console.log(cardsLikes);
  cardsLikes.forEach((cardlike) => {
    cardlike.addEventListener('click', () => cardlike.classList.toggle('card__like_active'))
  });
}
>>>>>>> cae58e2ad17004362e9a0c5f2b8af19625e193f1
