export default class FormValidator {
  constructor(validationSetting, formElement) {
    this._validationSetting = validationSetting;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSetting.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSetting.submitButtonSelector);
    this._formErrorList = Array.from(this._formElement.querySelectorAll(this._validationSetting.errorClass));
  }

  // функция показывает ошибку
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSetting.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._validationSetting.activeErrorClass);
  }

  // функция скрывает ошибку
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSetting.inputErrorClass);
    this._errorElement.classList.remove(this._validationSetting.activeErrorClass);
    this._errorElement.textContent = '';
  }

  // функция проверяет инпуты на валидность
  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  // функция проверяет на валидацию и показывает ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // функция вкл/выкл кнопку
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  // функция деактивирует кнопку
  _disableSubmitButton() {
    this._buttonElement.classList.add(this._validationSetting.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // функция активирует кнопку
  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._validationSetting.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // функция связывает событие валидации с инпутами
  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // функция сбрасывает валидцию форм
  resetValidation() {
    this._disableSubmitButton();

    this._formErrorList.forEach((formError) => {
      formError.textContent = '';
    });

    this._inputList.forEach((formInput) => {
      formInput.classList.remove(this._validationSetting.inputErrorClass);
    });

    this._formElement.reset();
  }
}
