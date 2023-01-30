import Popup from './Popup.js';
import { formInputSelector, popupFormSelector } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector)
    this._handleSubmit = submitForm;
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

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleSubmit(formData);
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    // this._resetValidator();
    super.close();
  }
}