// подключение модулей
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

// импорт константных данных
import { initialCards,
  cardsListSelector,
  cardPopupSelector,
  cardAddPopupSelector,
  cardPopupOpenButton,
  profilePopupEditButton,
  profilePopupSelector,
  profilePopupFormElement,
  cardAddPopupFormElement,
  userNameSelector,
  userInfoSelector,
  validationSetting
  } from '../scripts/utils/constants.js';

// создание экземпляра класса валидации формы профиля
const profilePopupFormValidator = new FormValidator(validationSetting, profilePopupFormElement);
profilePopupFormValidator.enableValidation();

// создание экземпляра класса валидации формы добавления новой карточки
const cardPopupFormValidator = new FormValidator(validationSetting, cardAddPopupFormElement);
cardPopupFormValidator.enableValidation();

// создание экземпляра класса попапа с изображением
const popupOpenImage = new PopupWithImage(cardPopupSelector);
popupOpenImage.setEventListeners();

// создание экземпляра класса
const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

// создание экземпляра класса попапа с формой для новой карточки
const cardPopup = new PopupWithForm({
    submitForm: (formData) => {
      cardsSection.renderItem(formData);
      cardPopupFormValidator.resetValidation();
    }
  },
  cardAddPopupSelector
);

// вызов функции привязки слушателей событий к попапу карточки
cardPopup.setEventListeners();

// создание экземпляра класса попапа с формой для данных профиля
const profilePopup = new PopupWithForm({
    submitForm: (formData) => {
      userInfo.setUserInfo(formData);
      profilePopupFormValidator.resetValidation();
    }
  },
  profilePopupSelector
);

// вызов функции привязки слушателей событий к попапу профиля
profilePopup.setEventListeners();

// создание экземпляра класса отрисовки секции
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.template', popupOpenImage.open);
      const contentFullCard = card.createCard();

      cardsSection.addItem(contentFullCard);
    }
  },
  cardsListSelector
);

// непосредственно отрисовка секции с карточками
cardsSection.renderItems();

// функция переноса данных со страницы в попап профиля
function transferProfileData() {
  const userData = userInfo.getUserInfo();
  profilePopup.setInputValues(userData);
}

// привязка слушателей событий к кнопкам открытия попапов
cardPopupOpenButton.addEventListener('click', () => {
  cardPopupFormValidator.resetValidation();
  cardPopup.open();
});

profilePopupEditButton.addEventListener('click', () => {
  profilePopupFormValidator.resetValidation();
  transferProfileData();
  profilePopup.open();
});
