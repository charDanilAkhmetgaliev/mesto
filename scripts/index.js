let editPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.popup__input_name');
let inputStatus = document.querySelector('.popup__input_status');

let formElement = document.querySelector('.popup__container')

function popupToggle() {
	if (!(popup.classList.contains('popup_opened'))) {
		inputName.value = profileName.textContent;
		inputStatus.value = profileStatus.textContent;
	}
	popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
	evt.preventDefault()
	profileStatus.textContent = inputStatus.value;
	profileName.textContent = inputName.value;
	popup.classList.toggle('popup_opened');
}

editPopupButton.addEventListener('click', popupToggle);
closePopupButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler);