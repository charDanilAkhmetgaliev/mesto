let editPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

function popupToggle() {
	popup.classList.toggle('popup_opened');
}

editPopupButton.addEventListener('click', popupToggle);
closePopupButton.addEventListener('click', popupToggle);
