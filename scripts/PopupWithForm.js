import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
<<<<<<< HEAD
    this._inputsData = {};
  }

  _getInputValues() {
    this._inputsList = super._popup.querySelectorAll('.popup__input');
    this._inputsList.forEach((input) => {
      this._inputsData[input.name] = input.value;
    });
    console.log(this._inputsData);
=======
  }

  _getInputValues() {

>>>>>>> be4d9c096ff3e3b329fa092a2e625da0b49c32e0
  }

  setEventListeners = () => {

  }

  close = () => {

  }
}