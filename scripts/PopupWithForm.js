import Popup from './Popup.js';
import { formInputSelector, popupFormSelector } from './utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({ submitForm, resetValidator }, popupSelector) {
    super(popupSelector)
    this._resetValidator = resetValidator;
    this._submitForm = submitForm;
    this._inputList = this._popup.querySelectorAll(formInputSelector);
    this._popupForm = this._popup.querySelector(popupFormSelector);
  }

  _getInputValues = () => {
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });

    return this._inputData;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submitForm);
  }

  close() {
    this._popupForm.reset();
    this._resetValidator();
    super.close();
  }
}
