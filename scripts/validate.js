// функция показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, validationSetting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSetting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSetting.errorClass);
}

// функция скрывает ошибку
const hideInputError = (formElement, inputElement, validationSetting) => {
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
const checkInputValidity = (inputElement, formElement, inputList, validationSetting) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSetting);
  } else {
    hideInputError(formElement, inputElement, validationSetting);
  }
}

// функция вкл/выкл кнопку
const toggleButtonState = (inputList, buttonElement, validationSetting) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSetting.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSetting.inactiveButtonClass);
  }
}

// функция связывает событие валидации с инпутами
const setInputEventListeners = (formElement, validationSetting) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSetting.inputSelector));
  const buttonElement = formElement.querySelector(validationSetting.submitButtonSelector);
  console.log(inputList);
  toggleButtonState(inputList, buttonElement, validationSetting);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, formElement, inputList, validationSetting);
      toggleButtonState(inputList, buttonElement, validationSetting);
    });
  });
}

// функция связывает событие валидации с формами
const enableValidation = (validationSetting) => {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  console.log(formList);
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setInputEventListeners(formElement, validationSetting);
  });
}

// вызов функции валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: '.popup__error_active'
});
