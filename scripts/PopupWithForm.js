import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._inputsData = {};
  }

  _getInputValues() {
    this._inputsList = super._popup.querySelectorAll('.popup__input');
    this._inputsList.forEach((input) => {
      this._inputsData[input.name] = input.value;
    });
    console.log(this._inputsData);
  }

  setEventListeners = () => {

  }

  close = () => {

  }
}