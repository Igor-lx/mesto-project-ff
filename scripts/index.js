// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

/*  const initialCards - массив объектов карточек
    initialCard.name - имя карточки
    initialCards.ink - ссылка
*/

const cardPlaceNode = document.querySelector('.places__list'); 
const cardItem = document.querySelector('#card-template').content.cloneNode(true);

cardItem.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
cardItem.querySelector('.card__title').textContent = 'Дюк Корморант';

cardPlaceNode.append(cardItem);