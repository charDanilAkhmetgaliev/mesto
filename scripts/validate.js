const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active'
}

// функция показывает ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSetting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSetting.errorClass);
}

// функция скрывает ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSetting.inputErrorClass);
  errorElement.classList.remove(validationSetting.errorClass);
  errorElement.textContent = '';
}

// функция проверяет инпуты на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// функция валидирует
const checkInputValidity = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// функция вкл/выкл кнопку
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    inactiveButton(buttonElement);
  } else {
    aciveButton(buttonElement);
  }
}

// функция деактивирует кнопку
function inactiveButton(buttonElement) {
  buttonElement.classList.add(validationSetting.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
}

// функция активирует кнопку
function aciveButton(buttonElement) {
  buttonElement.classList.remove(validationSetting.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', 'false');
}

// функция связывает событие валидации с инпутами
const setInputEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSetting.inputSelector));
  const buttonElement = formElement.querySelector(validationSetting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// функция связывает событие валидации с формами
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

    });
    setInputEventListeners(formElement);
  });
}

// вызов функции валидации
enableValidation();
