// подключение модулей
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

// импорт константных данных
import { cardDeletePopupSelector,
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
  validationSetting,
  url,
  userData as userAuthData
  } from '../scripts/utils/constants.js';

// функция авторизации пользователя
function authorization() {
  // создание экземпляра класса API
  const api = new Api(url, userAuthData);

  // промис с запросом данных о пользователе
  api.authorizationToServer().then((data) => {
    console.log('Profile ->', data);
    userInfo.setUserInfo(data);
  })
  .catch(err => console.log(err))

  // промис с запросом данных о карточках
  api.receiveCardsData().then((cardsData) => {
    console.log('Cards ->', cardsData);
    cardsSection.renderItems(cardsData.reverse());
  })
  .catch(err => console.log(err))

  return api;
}

const api = authorization();

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

const cardDeletePopup = new PopupWithForm({
  submitForm: () => {
    cardDeletePopup.close();
    }
  },
  cardDeletePopupSelector
);

cardDeletePopup.setEventListeners();

// создание экземпляра класса попапа с формой для новой карточки
const cardPopup = new PopupWithForm({
    submitForm: (formData) => {
      api.sendCardData(formData).then((cardData) => {
        console.log('Карточка добавлена ->', cardData);
        cardsSection.renderItem(cardData);
      })
      .catch(err => console.log(err))

      cardPopup.close();
    }
  },
  cardAddPopupSelector
);

// вызов функции привязки слушателей событий к попапу карточки
cardPopup.setEventListeners();

// создание экземпляра класса попапа с формой для данных профиля
const profilePopup = new PopupWithForm({
    submitForm: (formData) => {
      api.updateUserData(formData).then((profileData) => {
        console.log('Профиль успешно обновлен ->', profileData);
        userInfo.setUserInfo(profileData);
      })
      .catch(err => console.log(err));

      profilePopup.close();
    }
  },
  profilePopupSelector
);

// вызов функции привязки слушателей событий к попапу профиля
profilePopup.setEventListeners();

// создание экземпляра класса отрисовки секции
const cardsSection = new Section(
  {
    renderer: (item) => {
      const card = new Card(item, '.template', popupOpenImage.open, cardDeletePopup);
      const contentFullCard = card.createCard();

      cardsSection.addItem(contentFullCard);
    }
  },
  cardsListSelector
);

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
