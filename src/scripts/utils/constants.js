// Селекторы классов
export const cardsListSelector = '.elements__list';
export const cardPopupSelector = '.popup_card';
export const formInputSelector = '.popup__input';
export const popupFormSelector = '.popup__form';
export const cardAddPopupSelector = '.popup_new-card';
export const profilePopupSelector = '.popup_edit-profile';
export const userNameSelector = '.profile__name';
export const userInfoSelector = '.profile__status';
export const cardDeletePopupSelector = '.popup_card-delete';
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

// данные подключения к серверу
export const url = 'https://mesto.nomoreparties.co/v1';
// данные пользователя
export const userData = {
  userToken: '320b4a75-5470-48e7-b4e8-36be65b57c43',
  cohortName: 'cohort-58'
}
