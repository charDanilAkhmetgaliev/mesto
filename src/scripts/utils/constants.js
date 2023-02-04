// Селекторы классов
export const cardsListSelector = '.elements__list';
export const cardPopupSelector = '.popup_card';
export const formInputSelector = '.popup__input';
export const popupFormSelector = '.popup__form';
export const cardAddPopupSelector = '.popup_new-card';
export const profilePopupSelector = '.popup_edit-profile';
export const userNameSelector = '.profile__name';
export const userInfoSelector = '.profile__status';
export const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  activeErrorClass: 'popup__error_active',
  errorClass: '.popup__error'
}

// DOM-элементы
export const cardPopupOpenButton = document.querySelector('.profile__add-button');
export const profilePopupEditButton = document.querySelector('.profile__edit-button');
export const profilePopupFormElement = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);
export const cardAddPopupFormElement = document.querySelector(cardAddPopupSelector).querySelector(popupFormSelector);

// импортировать изображения
import kullsharifImage from '../../images/kul-sharif.jpg';
import kazanKremlinImage from '../../images/kremlin.jpg';
import dvoreczemImage from '../../images/dvorec-zem.jpg';
import chashaImage from '../../images/chasha.jpg';
import musazhalilImage from '../../images/musa-djalil.jpg';
import mileniumImage from '../../images/millenium.jpg';

// массив стандартных карточек
export const initialCards = [
  {
    name: 'Кулл-шариф',
    link: kullsharifImage
  },
  {
    name: 'Казанский Кремль',
    link: kazanKremlinImage
  },
  {
    name: 'Дворец Земледельцев',
    link: dvoreczemImage
  },
  {
    name: 'Центр семьи "Казан"',
    link: chashaImage
  },
  {
    name: 'Памятник Мусе Джалилю',
    link: musazhalilImage
  },
  {
    name: 'Мост "Миллениум"',
    link: mileniumImage
  }
];

// данные подключения к серверу
export const url = 'https://mesto.nomoreparties.co/v1';
// данные пользователя
export const userData = {
  userToken: '320b4a75-5470-48e7-b4e8-36be65b57c43',
  cohortName: 'cohort-58'
}