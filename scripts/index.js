// подключение модулей
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './InitialCards.js';
import Section from './Section.js';

const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'popup__error_active',
  errorClass: '.popup__error'
}

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

const profilePopupFormValidator = new FormValidator(validationSetting, profilePopupFormElement);
profilePopupFormValidator.enableValidation();

// функция открывает попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlerClosePopupEsc);
}

// функция закрывает попап при нажатии на esc
function handlerClosePopupEsc(evt) {
  if (evt.key === 'Escape') {
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
  profilePopupFormValidator.resetValidation();
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
const cardPopup = document.querySelector('.popup_card');
const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupLabel = cardPopup.querySelector('.popup__label');
const cardsListSelector = '.elements__list';

// привязка события закрывает попап с карточкой
closeCardPopupButton.addEventListener('click', () => closePopup(cardPopup));

// функция открывает попап карточки
function handleOpenCardPopup(cardName, cardLink) {
  cardPopupImage.src = cardLink;
  cardPopupImage.alt = `Изображение ${cardName}`;
  cardPopupLabel.textContent = cardName;

  openPopup(cardPopup);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '.template', handleOpenCardPopup);
      const readyCard = card.createCardHandler();

      cardsList.addItem(readyCard);
    }
  },
  cardsListSelector
); 

cardsList.setItems();

// функция добавляет новую карточку на страницу
// function addCard(cardName, cardLink) {
//   const card = new Card(cardName, cardLink, '.template', handleOpenCardPopup);
//   const readyCard = card.createCardHandler();
//   // добавляет новую карточку в html разметку
//   cardsList.prepend(readyCard);
// }

// цикл проходит по каждым данным карточек из массива стандартных в обратном порядке,
// и вызывает функцию добавления новой карточки с соответствующими данными
// initialCards.reverse().forEach((initialCardData) => {
//   addCard(initialCardData.name, initialCardData.link);
// });


// РЕАЛИЗАЦИЯ РУЧНОГО ДОБАВЛЕНИЯ КАРТОЧКИ
// объявление переменных
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_new-card');
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close-button');
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const newCardPopupNameInput = newCardPopup.querySelector('.popup__input_value-type_name');
const newCardPopupLinkInput = newCardPopup.querySelector('.popup__input_value-type_link');

const newCardPopupFormValidator = new FormValidator(validationSetting, newCardPopupForm);
newCardPopupFormValidator.enableValidation();

// Функция добавления карточки на страницу
function submitNewCardPopupForm(evt) {
  // отменяет отправку данных и перезагрузку страницы после события submit
  evt.preventDefault();
  // объявление переменных
  const cardName = newCardPopupNameInput.value;
  const cardLink = newCardPopupLinkInput.value;
  // вызывает функцию добваления новой карточки

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
  newCardPopupFormValidator.resetValidation();
  openPopup(newCardPopup);
}

// привязка события закрытия попапов
[newCardPopup, profilePopup, cardPopup].forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(event.target);
    }
  })
});
