// Объявление переменных
let editPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let inputName = document.querySelector('.popup__input_value-type_name');
let inputStatus = document.querySelector('.popup__input_value-type_status');

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

  // Вызов функции открытия/закрытия попапа
  togglePopup();
}

// Привязка события открытия/закрытия попапа к кнопкам
editPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

// Событие переноса данных на главную страницу
formElement.addEventListener('submit', formSubmitHandler);

//Реализация добавления стандартных карточек(6)
//Объявление массива данных стандартных карточек
const initialCards = [
  {
    name: 'Кулл-шариф',
    link: './images/kul-sharif.jpg',
    description: 'Изображение мечети Кул Шариф'
  },
  {
    name: 'Казанский Кремль',
    link: './images/kremlin.jpg',
    description: 'Изображение Казанского Кремля'
  },
  {
    name: 'Дворец Земледельцев',
    link: './images/dvorec-zem.jpg',
    description: 'Изображение Дворца Земледельцев'
  },
  {
    name: 'Центр семьи "Казан"',
    link: './images/chasha.jpg',
    description: 'Изображение Центра семьи "Казан"'
  },
  {
    name: 'Памятник Мусе Джалилю',
    link: './images/musa-djalil.jpg',
    description: 'Изображение памятника Мусе Джалилю'
  },
  {
    name: 'Мост "Миллениум"',
    link: './images/millenium.jpg',
    description: 'Изображение моста "Миллениум"'
  }
];
//Объявляем переменную содержимого template-элемента
const template = document.querySelector('.template').content;
//Объявляем переменную списка карточек
let cardsList = document.querySelector('.elements__list');
//Объявляем переменную элемента с карточкой

//Цикл добавления стандартных карточек
for (let i = 0; i < 6; i++) {
  let card = template.querySelector('.card').cloneNode(true);
  // card.querySelector('.card__image').;
  card.querySelector('.card__image').src = initialCards[i].link;
  card.querySelector('.card__image').alt = initialCards[i].description;
  card.querySelector('.card__title').textContent = initialCards[i].name;

  cardsList.append(card);
}


