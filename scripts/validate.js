const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

// функция показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// функция скрывает ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

// функция проверяет инпуты на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// функция валидирует
const checkInputValidity = (inputElement, formElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// функция вкл/выкл кнопку
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    inactiveButton(buttonElement, inactiveButtonClass);
  } else {
    aciveButton(buttonElement, inactiveButtonClass);
  }
}

// функция деактивирует кнопку
function inactiveButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
}

// функция активирует кнопку
function aciveButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'false');
}

// функция связывает событие валидации с инпутами
const setInputEventListeners = (formElement, validationSetting) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSetting.inputSelector));
  const buttonElement = formElement.querySelector(validationSetting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationSetting.inactiveButtonClass);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, formElement, validationSetting.inputErrorClass, validationSetting.errorClass);
      toggleButtonState(inputList, buttonElement, validationSetting.inactiveButtonClass);
    });
  });
}

// функция связывает событие валидации с формами
const enableValidation = (validationSetting) => {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

    });
    setInputEventListeners(formElement, validationSetting);
  });
}

// вызов функции валидации
enableValidation(validationSetting);

function resetValidation(popup, inactiveButtonClass) {
  if (!(popup.classList.contains('popup_card'))) {
    const saveButton = popup.querySelector('.popup__save-button');
    const popupForm = popup.querySelector('.popup__form');
    const formErrorList = Array.from(popupForm.querySelectorAll('.popup__error'));
    const formInputList = Array.from(popupForm.querySelectorAll('.popup__input'));

    inactiveButton(saveButton, inactiveButtonClass);

    formErrorList.forEach(function (formError) {
      formError.textContent = '';
    });

    formInputList.forEach(function (formInput) {
      formInput.classList.remove('popup__input_error');
    });

    popupForm.reset();
  }
}
