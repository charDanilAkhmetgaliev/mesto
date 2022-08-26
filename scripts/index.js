// РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ДАННЫХ ПРОФИЛЯ
// Объявление переменных
let editPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let inputName = popup.querySelector('.popup__input_value-type_name');
let inputStatus = popup.querySelector('.popup__input_value-type_status');

let formElement = popup.querySelector('.popup__form');

// Универсальная функция открывает попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Универсальная функция закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// Функция переносит данные со страницы на сайт
function openEventProfilePopup() {
  inputName.value = profileName.textContent;
  inputStatus.value = profileStatus.textContent;

  openPopup(popup);
}

// Функция переноса данных с попапа на главную страницу
function formSubmitHandler(evt) {
  // Отмена отправки данных и перезагрузки страницы после события submit
  evt.preventDefault();
  // Перенос значений инпутов на главную страницу-------------
  profileStatus.textContent = inputStatus.value;
  profileName.textContent = inputName.value;
  // Вызов функции открытия/закрытия попапа
  closePopup(popup);
}

// Привязка события открытия/закрытия попапа к кнопкам
editPopupButton.addEventListener('click', openEventProfilePopup);
closePopupButton.addEventListener('click', () => closePopup(popup));

// Событие переноса данных на главную страницу
formElement.addEventListener('submit', formSubmitHandler);


//РЕАЛИЗАЦИЯ ДОБАВЛЕНИЯ СТАНДАРТНЫХ КАРТОЧЕК(6)
//Объявление массива данных
let initialCards = [
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
//Объявляем переменную содержимого template-элемента
const template = document.querySelector('.template').content;
//Объявляем переменную списка карточек
let cardsList = document.querySelector('.elements__list');
// Функция добавления карточек на страницу
function addCard(dataCards) {
  dataCards.reverse().forEach((dataCard) => {
    let card = template.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = dataCard.link;
    card.querySelector('.card__image').alt = dataCard.description;
    card.querySelector('.card__title').textContent = dataCard.name;
    cardsList.prepend(card);
  });
  activateLike();
}
// Вызов функции добавления стандартных карточек
addCard(initialCards);


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
  addCard(newCardData);
  closePopup(cardPopup);
}

// Привязка события открытия/закрытия попапа к кнопкам
addCardButton.addEventListener('click', () => openPopup(cardPopup));
closeCardPopupButton.addEventListener('click', () => closePopup(cardPopup));

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
