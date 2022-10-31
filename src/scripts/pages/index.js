// подключение модулей
import '../../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards } from '../utils/InitialCards.js';
import { cardsListSelector,
  cardPopupSelector,
  addCardPopupSelector,
  openAddCardPopupButton,
  openProfilePopupButton,
  profilePopupSelector,
  profilePopupFormElement,
  addCardPopupFormElement,
  userNameSelector,
  userInfoSelector,
  validationSetting
  } from '../utils/constants.js';



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
      cardsSection.setItems();
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
      userInfo.setUserInfo(userData);
      profilePopup.close();
    },
    resetValidator: () => {
      profilePopupFormValidator.resetValidation();
    }
  },
  profilePopupSelector
);

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template', popupOpenImage.open, initialCards);
      const readyCard = card.createCardHandler();

      cardsSection.addItem(readyCard);
    }
  },
  cardsListSelector
);

cardsSection.setItems();

openAddCardPopupButton.addEventListener('click', () => cardPopup.open());
openProfilePopupButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profilePopup.setInputValues(userData);
  profilePopup.open();
});
