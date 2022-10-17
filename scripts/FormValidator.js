export default class FormValidator {
  constructor(validationSetting, formElement) {
    this._validationSetting = validationSetting;
    this._formElement = formElement;
  }

  // функция показывает ошибку
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSetting.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._validationSetting.errorClass);
  }

  // функция скрывает ошибку
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSetting.inputErrorClass);
    this._errorElement.classList.remove(this._validationSetting.errorClass);
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
      this._inactiveButton(this._buttonElement);
    } else {
      this._aciveButton(this._buttonElement);
    }
  }

  // функция деактивирует кнопку
  _inactiveButton(buttonElement) {
    buttonElement.classList.add(this._validationSetting.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  }

  // функция активирует кнопку
  _aciveButton(buttonElement) {
    buttonElement.classList.remove(this._validationSetting.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'false');
  }

  // функция связывает событие валидации с инпутами
  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSetting.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSetting.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // функция сбрасывает валидцию форм
  resetValidation(popup) {
      this._saveButton = popup.querySelector('.popup__save-button');
      this._formErrorList = Array.from(this._formElement.querySelectorAll('.popup__error'));
      this._formInputList = Array.from(this._formElement.querySelectorAll('.popup__input'));

      this._inactiveButton(this._saveButton);

      this._formErrorList.forEach(function (formError) {
        formError.textContent = '';
      });

      this._formInputList.forEach(function (formInput) {
        formInput.classList.remove('popup__input_error');
      });

      this._formElement.reset();
    }
}