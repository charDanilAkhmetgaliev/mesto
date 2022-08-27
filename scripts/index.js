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
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

// Универсальная функция закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
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

// привязка события переноса данных на главную страницу
formElement.addEventListener('submit', formSubmitHandler);


//РЕАЛИЗАЦИЯ АВТОМАТИЧЕСКОГО ДОБАВЛЕНИЯ СТАНДАРТНЫХ КАРТОЧЕК
//Объявление массива данных стандартных карточек
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

//Объявление переменных
const template = document.querySelector('.template').content;
let cardsList = document.querySelector('.elements__list');
let cardsLikes = cardsList.querySelectorAll('.card__like');

// Функция добавления новых карточек на страницу
function addCard(dataCards) {
  dataCards.reverse().forEach((dataCard) => {
    let card = template.querySelector('.card').cloneNode(true);
    let cardImage = card.querySelector('.card__image');
    // перенос данных из инпутов в кароточку
    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.description;
    card.querySelector('.card__title').textContent = dataCard.name;

    // привязка события добавления/удаления лайка
    let cardLikeButton = card.querySelector('.card__like');
    cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('card__like_active'));
    
    // привязка события удаления карточки
    let cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => cardDeleteButton.closest('.card').remove());
    
    // функция открытия попапа карточки
    let openedCardPopup = document.querySelector('.popup_opened-card');
    let closeCardPopupButton = openedCardPopup.querySelector('.popup__close-button');
    let openCardPopup = () => {
        let popupImage = openedCardPopup.querySelector('.popup__image');
        popupImage.src = dataCard.link;
        popupImage.alt = dataCard.description;
        openedCardPopup.querySelector('.popup__label').textContent = dataCard.name;
        openPopup(openedCardPopup);
    }
    // привязка события открытия попапа карточки
    cardImage.addEventListener('click', openCardPopup);
    // привязка события закрытия попапа карточки
    closeCardPopupButton.addEventListener('click', () => closePopup(openedCardPopup));

    // добавление новой карточки в начало
    cardsList.prepend(card);
  });
}
// Вызов функции добавления стандартных карточек
addCard(initialCards);


// РЕАЛИЗАЦИЯ РУЧНОГО ДОБАВЛЕНИЯ КАРТОЧКИ
// Объявление переменных
const addCardButton = document.querySelector('.profile__add-button');
let addCardPopup = document.querySelector('.popup_add-card');
const closeCardPopupButton = addCardPopup.querySelector('.popup__close-button');
let formCardElement = addCardPopup.querySelector('.popup__form');
let cardName = addCardPopup.querySelector('.popup__input_value-type_name');
let cardLink = addCardPopup.querySelector('.popup__input_value-type_link');

// Функция сбора данных о новой карточке и добавления на страницу
function formCardSubmitHandler(evt) {
  evt.preventDefault();
  let newCardData = [
    {
      name: cardName.value,
      link: cardLink.value
    }
  ];
  addCard(newCardData);
  closePopup(addCardPopup);
}

// Привязка события открытия/закрытия попапа к кнопкам
addCardButton.addEventListener('click', () => openPopup(addCardPopup));
closeCardPopupButton.addEventListener('click', () => closePopup(addCardPopup));

// Привязка события добавления новой карточки
formCardElement.addEventListener('submit', formCardSubmitHandler);



