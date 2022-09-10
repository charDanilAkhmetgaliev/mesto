// РЕАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ДАННЫХ ПРОФИЛЯ
// объявление переменных
const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_edit-profile');
const closePopupProfileButton = profilePopup.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profilePopupNameInput = profilePopup.querySelector('.popup__input_value-type_name');
const profilePopupStatusInput = profilePopup.querySelector('.popup__input_value-type_status');

const profilePopupFormElement = profilePopup.querySelector('.popup__form');

// функция очищает форму
function clearFormData(popup) {
  const popupForm = popup.querySelector('.popup__form');
  const formErrorList = Array.from(popupForm.querySelectorAll('.popup__error'));
  const formInputList = Array.from(popupForm.querySelectorAll('.popup__input'));

  formErrorList.forEach(function (formError) {
    formError.textContent = '';
  });

  formInputList.forEach(function (formInput) {
    formInput.classList.remove(validationSetting.inputErrorClass);
  });
}

// функция открывает попап
function openPopup(popup) {
  const popupForm = popup.querySelector('.popup__form');
  const formButton = popup.querySelector('.popup__save-button');
  const formInputList = Array.from(popupForm.querySelectorAll('.popup__input'));

  toggleButtonState(formInputList, formButton);
  popup.classList.add('popup_opened');
}

// функция закрывает попап
function closePopup(popup) {
  clearFormData(popup);
  popup.classList.remove('popup_opened');
}

// функция переносит данные со страницы в попап
function openEventProfilePopup() {
  profilePopupNameInput.value = profileName.textContent;
  profilePopupStatusInput.value = profileStatus.textContent;

  openPopup(profilePopup);
}

// функция переноса данных с попапа на главную страницу
function submitPopupProfileForm(evt) {
  // отмена отправки данных и перезагрузки страницы после события submit
  evt.preventDefault();
  // перенос значений инпутов на главную страницу-------------
  profileStatus.textContent = profilePopupStatusInput.value;
  profileName.textContent = profilePopupNameInput.value;
  // вызов функции открытия/закрытия попапа
  closePopup(profilePopup);
}

// Привязка события открытия/закрытия попапа к кнопкам
openEditProfilePopupButton.addEventListener('click', openEventProfilePopup);
closePopupProfileButton.addEventListener('click', () => closePopup(profilePopup));

// привязка события переноса данных на главную страницу
profilePopupFormElement.addEventListener('submit', submitPopupProfileForm);


// РЕАЛИЗАЦИЯ АВТОМАТИЧЕСКОГО ДОБАВЛЕНИЯ СТАНДАРТНЫХ КАРТОЧЕК
// объявление переменных
const template = document.querySelector('.template').content.querySelector('.card');
const cardsList = document.querySelector('.elements__list');
// функция переключает состояния лайка
const toggleLike = (card) => {
  const likeCardButton = card.querySelector('.card__like');
  likeCardButton.addEventListener('click', () => likeCardButton.classList.toggle('card__like_active'));
}
// функция удаляет карточку
const deleteCard = (card) => {
  const deleteCardButton = card.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', () => card.remove());
}
// объявление переменных
const cardPopup = document.querySelector('.popup_card');
const closeCardPopupButton = cardPopup.querySelector('.popup__close-button');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupLabel = cardPopup.querySelector('.popup__label');
// функция открывает попап с карточкой
const openCardPopup = (cardName, cardLink) => {
  cardPopupImage.src = cardLink;
  cardPopupImage.alt = `Изображение ${cardName}`;
  cardPopupLabel.textContent = cardName;

  openPopup(cardPopup);
}
// привязка события закрывает попап с карточкой
closeCardPopupButton.addEventListener('click', () => closePopup(cardPopup));

// функция создает карточку
const createCard = (cardName, cardLink) => {
  // создает новую карточку из шаблона
  const card = template.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  // переносит данные из формы попапа в новую карточку
  cardTitle.textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = `Изображение ${cardName}`;
  // вызывает функцию связки событий лайка с кнопкой
  toggleLike(card);
  // вызывает функцию связки удаления карточки с кнопкой
  deleteCard(card);
  // привязка события открывает попап карточки
  cardImage.addEventListener('click', () => openCardPopup(cardName, cardLink));
  // возвращает готовую новую карточку
  return card;
}

// функция добавляет новую карточку на страницу
function addCard(cardName, cardLink) {
  // добавляет новую карточку в html разметку
  cardsList.prepend(createCard(cardName, cardLink));
}

// цикл проходит по каждым данным карточек из массива стандартных в обратном порядке,
// и вызывает функцию добавления новой карточки с соответствующими данными
initialCards.reverse().forEach((initialCardData) => addCard(initialCardData.name, initialCardData.link));


// РЕАЛИЗАЦИЯ РУЧНОГО ДОБАВЛЕНИЯ КАРТОЧКИ
// объявление переменных
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_new-card');
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close-button');
const newCardPopupForm = newCardPopup.querySelector('.popup__form');
const newCardPopupNameInput = newCardPopup.querySelector('.popup__input_value-type_name');
const newCardPopupLinkInput = newCardPopup.querySelector('.popup__input_value-type_link');

// Функция добавления карточки на страницу
function submitNewCardPopupForm(evt) {
  // отменяет отправку данных и перезагрузку страницы после события submit
  evt.preventDefault();
  // объявление переменных
  const cardName = newCardPopupNameInput.value;
  const cardLink = newCardPopupLinkInput.value;
  // вызывает функцию добваления новой карточки
  addCard(cardName, cardLink);
  // закрывает попап
  closePopup(newCardPopup);
  // очищает поля формы попапа
  newCardPopupForm.reset();
}

// Привязка события открытия/закрытия попапа к кнопкам
addNewCardButton.addEventListener('click', () => openPopup(newCardPopup));
closeNewCardPopupButton.addEventListener('click', () => {
  closePopup(newCardPopup);
  newCardPopupForm.reset();
});

// Привязка обрабатвает событие добавления новой карточки
newCardPopupForm.addEventListener('submit', submitNewCardPopupForm);

