export default class FormValidator {
  constructor(validationSetting, formElement) {
    this._formElement = formElement;
    this._formSelector = validationSetting.formSelector;
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._inputErrorClass = validationSetting.inputErrorClass;
    this._errorClass = validationSetting.errorClass;
  }

  _showInputError() {
    this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError() {
    this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
  
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _inactiveButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  }

  _aciveButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', 'false');
  }

  _hasInvalidInput() {
    return this._inputList.some(function (_inputElement) {
      return !_inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (_hasInvalidInput(this._inputList)) {
      _inactiveButton();
    } else {
      _aciveButton();
    }
  }

  _checkInputValidity() {
    if (!this._inputElement.validity.valid) {
      _showInputError();
    } else {
      _hideInputError();
    }
  }

  _setInputEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    _toggleButtonState();
    this._inputList.forEach(function (inputElement) {
      this._inputElement = inputElement;
      this._inputElement.addEventListener('input', function () {
        _checkInputValidity();
        _toggleButtonState();
      });
    });
  }

  enableValidation() {
    setInputEventListeners(formElement, validationSetting);
    // const formList = Array.from(document.querySelectorAll(this._formSelector));
    // formList.forEach(function (formElement) {
    //   formElement.addEventListener('submit', function (evt) {
    //     evt.preventDefault();
    //   });
    //   setInputEventListeners(formElement, validationSetting);
    // });
  }
}