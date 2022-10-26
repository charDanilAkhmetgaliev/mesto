// подключение модулей
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './InitialCards.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import { cardsListSelector,
  cardPopupSelector,
  addCardPopupSelector,
  openAddCardPopupButton,
  popupFormSelector } from './utils/constants.js';

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

const newCardPopup = document.querySelector(addCardPopupSelector);
const newCardPopupForm = newCardPopup.querySelector(popupFormSelector);

const newCardPopupFormValidator = new FormValidator(validationSetting, newCardPopupForm);
newCardPopupFormValidator.enableValidation();

const popupOpenImage = new PopupWithImage(cardPopupSelector);

const newCard = new PopupWithForm({
  submitForm: (evt) => {
    evt.preventDefault();
    const cardData = newCard._getInputValues();
    initialCards.unshift({ name: cardData.name, link: cardData.link });
    cardsList.setItems();
    newCard.close();
    },
  resetValidator: () => {
    newCardPopupFormValidator.resetValidation();
    }
  },
  addCardPopupSelector
);

openAddCardPopupButton.addEventListener('click', () => newCard.open());

// функция открывает попап
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handlerClosePopupEsc);
// }

// функция закрывает попап при нажатии на esc
// function   (evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// функция закрывает попап
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handlerClosePopupEsc);
// }

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
// const cardPopup = document.querySelector('.popup_card');
// const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');

// привязка события закрывает попап с карточкой
// closeCardPopupButton.addEventListener('click', () => closePopup(cardPopup));

// функция открывает попап карточки
// function handleOpenCardPopup(cardName, cardLink) {
//   cardPopupImage.src = cardLink;
//   cardPopupImage.alt = `Изображение ${cardName}`;
//   cardPopupLabel.textContent = cardName;

//   openPopup(cardPopup);
// }
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template', popupOpenImage.open);
      const readyCard = card.createCardHandler();

      cardsList.addItem(readyCard);
    }
  },
  cardsListSelector
);

cardsList.setItems();

// РЕАЛИЗАЦИЯ РУЧНОГО ДОБАВЛЕНИЯ КАРТОЧКИ
// объявление переменных




// Привязка события открытия/закрытия попапа к кнопкам
// addNewCardButton.addEventListener('click', openNewCardPopup);
// closeNewCardPopupButton.addEventListener('click', () => {
//   closePopup(newCardPopup);
// });

// Привязка обрабатвает событие добавления новой карточки
// newCardPopupForm.addEventListener('submit', submitNewCardPopupForm);

// функция закрытия попапа добавления новой карточки
// function openNewCardPopup() {
//   newCardPopupFormValidator.resetValidation();
//   openPopup(newCardPopup);
// }

// привязка события закрытия попапов
// [newCardPopup, profilePopup, cardPopup].forEach(popup => {
//   popup.addEventListener('click', (event) => {
//     if (event.target.classList.contains('popup')) {
//       closePopup(event.target);
//     }
//   })
// });
