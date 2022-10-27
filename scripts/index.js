// подключение модулей
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

import { initialCards } from './InitialCards.js';
import { cardsListSelector,
  cardPopupSelector,
  addCardPopupSelector,
  openAddCardPopupButton,
  openProfilePopupButton,
  profilePopupSelector,
  profilePopupFormElement,
  addCardPopupFormElement,
  userNameSelector,
  userInfoSelector
  } from './utils/constants.js';

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
const profilePopupFormValidator = new FormValidator(validationSetting, profilePopupFormElement);
profilePopupFormValidator.enableValidation();

const newCardPopupFormValidator = new FormValidator(validationSetting, addCardPopupFormElement);
newCardPopupFormValidator.enableValidation();

const popupOpenImage = new PopupWithImage(cardPopupSelector);

const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

const cardPopup = new PopupWithForm({
  submitForm: (evt) => {
    evt.preventDefault();
    const cardData = cardPopup._getInputValues();
    initialCards.unshift({ name: cardData.name, link: cardData.link });
    cardsList.setItems();
    cardPopup.close();
    },
  resetValidator: () => {
    newCardPopupFormValidator.resetValidation();
    }
  },
  addCardPopupSelector
);

const profilePopup = new PopupWithForm({
  submitForm: (evt) => {
    evt.preventDefault();
    const userData = profilePopup._getInputValues();
    console.log(userData);
    userInfo.setUserInfo(userData);
    profilePopup.close();
   },
  resetValidator: () => {
    profilePopupFormValidator.resetValidation();
  }
  },
  profilePopupSelector
);

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

openAddCardPopupButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();

  cardPopup.open();
});
openProfilePopupButton.addEventListener('click', () => profilePopup.open());

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
// function openEventProfilePopup() {
//   profilePopupFormValidator.resetValidation();
//   openPopup(profilePopup);
//   profilePopupNameInput.value = profileName.textContent;
//   profilePopupStatusInput.value = profileStatus.textContent;
// }

// функция переноса данных с попапа на главную страницу
// function submitPopupProfileForm(evt) {
//   // отмена отправки данных и перезагрузки страницы после события submit
//   evt.preventDefault();
//   // перенос значений инпутов на главную страницу-------------
//   profileStatus.textContent = profilePopupStatusInput.value;
//   profileName.textContent = profilePopupNameInput.value;
//   // вызов функции открытия/закрытия попапа
//   closePopup(profilePopup);
// }

// Привязка события открытия/закрытия попапа к кнопкам
// openEditProfilePopupButton.addEventListener('click', openEventProfilePopup);
// closePopupProfileButton.addEventListener('click', () => closePopup(profilePopup));

// привязка события переноса данных на главную страницу
// profilePopupFormElement.addEventListener('submit', submitPopupProfileForm);


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
