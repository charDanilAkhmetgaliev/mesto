// подключение модулей
import '../../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// подключение константных данных
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

// создание экземпляра класса валидации формы профиля
const profilePopupFormValidator = new FormValidator(validationSetting, profilePopupFormElement);
profilePopupFormValidator.enableValidation();

// создание экземпляра класса валидации формы добавления новой карточки
const newCardPopupFormValidator = new FormValidator(validationSetting, addCardPopupFormElement);
newCardPopupFormValidator.enableValidation();

// создание экземпляра класса попапа с изображением
const popupOpenImage = new PopupWithImage(cardPopupSelector);
popupOpenImage.setEventListeners();

// создание экземпляра класса
const userInfo = new UserInfo({ userNameSelector, userInfoSelector });

// создание экземпляра класса попапа с формой для новой карточки
const cardPopup = new PopupWithForm({
    submitForm: (formData) => {
      cardsSection.renderItem(formData);
      newCardPopupFormValidator.resetValidation();
    }
  },
  addCardPopupSelector
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
      const readyCard = card.createCard();

      cardsSection.addItem(readyCard);
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
openAddCardPopupButton.addEventListener('click', () => {
  newCardPopupFormValidator.resetValidation();
  cardPopup.open()});

openProfilePopupButton.addEventListener('click', () => {
  profilePopupFormValidator.resetValidation();
  transferProfileData();
  profilePopup.open();
});
