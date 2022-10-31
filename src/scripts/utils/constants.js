// Селекторы классов
export const cardsListSelector = '.elements__list';
export const cardPopupSelector = '.popup_card';
export const formInputSelector = '.popup__input';
export const popupFormSelector = '.popup__form';
export const addCardPopupSelector = '.popup_new-card';
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
export const openAddCardPopupButton = document.querySelector('.profile__add-button');
export const openProfilePopupButton = document.querySelector('.profile__edit-button');
export const profilePopupFormElement = document.querySelector(profilePopupSelector).querySelector(popupFormSelector);
export const addCardPopupFormElement = document.querySelector(addCardPopupSelector).querySelector(popupFormSelector);
