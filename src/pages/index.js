// подключение модулей
import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

// импорт константных данных
import { avatarUpdPopupFormElement,
  avatarUpdateButton,
  avatarUpdatePopupSelector,
  cardDelPopupSelector,
  cardsListSelector,
  cardPopupSelector,
  cardAddPopupSelector,
  cardPopupOpenButton,
  profilePopupEditButton,
  profilePopupSelector,
  profilePopupFormElement,
  cardAddPopupFormElement,
  validationSetting,
  url,
  userAuthData
  } from '../scripts/utils/constants.js';
import {logPlugin} from "@babel/preset-env/lib/debug";

// функция авторизации пользователя
function authorization() {
  // создание экземпляра класса API
  const api = new Api(url, userAuthData);

  api.getUserInfo().then((userData) => {

    // функция обновляет карточки на странице
    function updateCards() {
      api.getCardsData().then((cardsData) => {
        cardsData.reverse();
        console.log(cardsData)
        cardsSection.clearCards();
        cardsData.forEach(cardData => {
          cardsSection.renderItem(cardData);
        })
      })
    }

    function rendererPage() {
      userInfo.setUserInfo(userData);
      updateCards();
      setInterval(updateCards, 4000);
    }

    const avatarUpdPopupFormValidator = new FormValidator(validationSetting, avatarUpdPopupFormElement);
    avatarUpdPopupFormValidator.enableValidation();

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
    const userInfo = new UserInfo();

    const cardDelPopup = new PopupWithConfirmation({
      submitForm: (cardId) => {
        return api.deleteCardData(cardId).then(() => {
        })
      }
    },
      cardDelPopupSelector
    );

    cardDelPopup.setEventListeners();

    const avatarUpdatePopup = new PopupWithForm({
        submitForm: (formData) => {
          return api.updateAvatarData(formData).then((avatarData) => {
            userInfo.setUserInfo(avatarData);
          })
        }
      },
      avatarUpdatePopupSelector
    );

    avatarUpdatePopup.setEventListeners();

    // создание экземпляра класса попапа с формой для новой карточки
    const cardPopup = new PopupWithForm({
        submitForm: (formData) => {
          return api.sendCardData(formData).then((cardData) => {
            cardsSection.renderItem(cardData);
          })
        }
      },
      cardAddPopupSelector
    );

    // вызов функции привязки слушателей событий к попапу карточки
    cardPopup.setEventListeners();

    // создание экземпляра класса попапа с формой для данных профиля
    const profilePopup = new PopupWithForm({
        submitForm: (formData) => {
          return api.updateProfileData(formData).then((profileData) => {
            userInfo.setUserInfo(profileData);
          })
        }
      },
      profilePopupSelector
    );

    // вызов функции привязки слушателей событий к попапу профиля
    profilePopup.setEventListeners();

    // создание экземпляра класса отрисовки секции
    const cardsSection = new Section(
      {
        renderer: (cardData) => {
          const card = new Card({
            cardData: cardData,
            templateSelector: '.template',
            handleCardClick: popupOpenImage.open,
            cardDelPopup: cardDelPopup,
            doLike: (cardId) => {
              return api.addLikeToCard(cardId).then(() => {
                // updateCards();
              })
            },
            delLike: (cardId) => {
              return api.delLikeToCard(cardId).then(() => {
                // updateCards();
              })
            }
          });
          const contentFullCard = card.createCard(userData._id);

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

    avatarUpdateButton.addEventListener('click', () => {
      avatarUpdPopupFormValidator.resetValidation();
      avatarUpdatePopup.open();
    });
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

    rendererPage();
  })
  .catch((err) => console.log(err))
}

authorization();
