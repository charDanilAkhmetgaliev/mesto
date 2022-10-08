import Card from './Card.js';
// РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ДАННЫХ ПРОФИЛЯ
// объявление переменных
const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_edit-profile');
const closePopupProfileButton = profilePopup.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profilePopupNameInput = profilePopup.querySelector('.popup__input_value-type_name');
const profilePopupStatusInput = profilePopup.querySelector('.popup__input_value-type_status');

const profilePopupFormElement = profilePopup.querySelector('.popup__form');

// функция открывает попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerClosePopupEsc);
}

// функция закрывает попап при нажатии на esc
function handlerClosePopupEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// функция закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlerClosePopupEsc);
}

// функция открывает попап редактирования профиля
function openEventProfilePopup() {
  resetValidation(profilePopup, validationSetting.inactiveButtonClass);
  openPopup(profilePopup);
  profilePopupNameInput.value = profileName.textContent;
  profilePopupStatusInput.value = profileStatus.textContent;
}

// функция переноса данных с попапа на главную страницу
function submitPopupProfileForm(evt) {
  // отмена отправки данных и перезагрузки страницы после события submit
  evt.preventDefault();
  // перенос значений инпутов на главную страницу-------------
  profileStatus.textContent = profilePopupStatusInput.value;
  profileName.textContent = profilePopupNameInput.value;
  // вызов функции открытия/закрытия попапа
  closePopup(profilePopup);
}

// Привязка события открытия/закрытия попапа к кнопкам
openEditProfilePopupButton.addEventListener('click', openEventProfilePopup);
closePopupProfileButton.addEventListener('click', () => closePopup(profilePopup));

// привязка события переноса данных на главную страницу
profilePopupFormElement.addEventListener('submit', submitPopupProfileForm);


// РЕАЛИЗАЦИЯ АВТОМАТИЧЕСКОГО ДОБАВЛЕНИЯ СТАНДАРТНЫХ КАРТОЧЕК
// объявление переменных
const cardsList = document.querySelector('.elements__list');

// объявление переменных
const cardPopup = document.querySelector('.popup_card');
const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupLabel = cardPopup.querySelector('.popup__label');

// функция открывает попап с карточкой
const openCardPopup = (cardName, cardLink) => {
  cardPopupImage.src = cardLink;
  cardPopupImage.alt = `Изображение ${cardName}`;
  cardPopupLabel.textContent = cardName;

  openPopup(cardPopup);
}
// привязка события закрывает попап с карточкой
closeCardPopupButton.addEventListener('click', () => closePopup(cardPopup));

// функция добавляет новую карточку на страницу
function addCard(initialCardData) {
  const card = new Card(initialCardData, '.template');
  const readyCard = card.createCardHandler();
  card.cardImage.addEventListener('click', () => openCardPopup(initialCardData.name, initialCardData.link));
  // добавляет новую карточку в html разметку
  cardsList.prepend(readyCard);
}

// цикл проходит по каждым данным карточек из массива стандартных в обратном порядке,
// и вызывает функцию добавления новой карточки с соответствующими данными
initialCards.reverse().forEach((initialCardData) => {
  addCard(initialCardData);
});


// РЕАЛИЗАЦИЯ РУЧНОГО ДОБАВЛЕНИЯ КАРТОЧКИ
// объявление переменных
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_new-card');
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close-button');
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const newCardPopupNameInput = newCardPopup.querySelector('.popup__input_value-type_name');
const newCardPopupLinkInput = newCardPopup.querySelector('.popup__input_value-type_link');

// Функция добавления карточки на страницу
function submitNewCardPopupForm(evt) {
  // отменяет отправку данных и перезагрузку страницы после события submit
  evt.preventDefault();
  // объявление переменных
  const cardName = newCardPopupNameInput.value;
  const cardLink = newCardPopupLinkInput.value;
  // вызывает функцию добваления новой карточки
  addCard(cardName, cardLink);
  // закрывает попап
  closePopup(newCardPopup);
  // очищает поля формы попапа
  newCardPopupForm.reset();
}

// Привязка события открытия/закрытия попапа к кнопкам
addNewCardButton.addEventListener('click', openNewCardPopup);
closeNewCardPopupButton.addEventListener('click', () => {
  closePopup(newCardPopup);
});

// Привязка обрабатвает событие добавления новой карточки
newCardPopupForm.addEventListener('submit', submitNewCardPopupForm);

// функция закрытия попапа добавления новой карточки
function openNewCardPopup() {
  resetValidation(newCardPopup, validationSetting.inactiveButtonClass);
  openPopup(newCardPopup);
}

// привязка события закрывает попап добавления карточки на overlay
newCardPopup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup(newCardPopup);
  }
});

// привязка события закрывает попап редактирования профиля на overlay
profilePopup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup(profilePopup);
  }
});

// привязка события закрывает попап карточки на overlay
cardPopup.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup(cardPopup);
  }
});
