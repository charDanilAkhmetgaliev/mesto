// Объявление переменных
let editPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.popup__input_name');
let inputStatus = document.querySelector('.popup__input_status');

let formElement = document.querySelector('.popup__container');

// Функция открытия/закрытия попапа
function togglePopup() {
  // Условие: если попап НЕ открыт
  if (!(popup.classList.contains('popup_opened'))) {
    // Перенос актуальных значений в инпуты
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
  }
  // Открывает или закрывает поппап в зависимости от наличия/отсутствия класса
  popup.classList.toggle('popup_opened');
}

// Функция переноса данных с попапа на главную страницу
function formSubmitHandler(evt) {

  // Отмена отправки данных и перезагрузки страницы после события submit
  evt.preventDefault();

  // Перенос значений инпутов на главную страницу
  profileStatus.textContent = inputStatus.value;
  profileName.textContent = inputName.value;

  // Функция открытия/закрытия попапа
  togglePopup();
}

// Привязка события открытия/закрытия попапа к кнопкам
editPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

// Событие переноса данных на главную страницу
formElement.addEventListener('submit', formSubmitHandler);
