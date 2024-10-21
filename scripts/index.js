// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//const cardPlace = document.querySelector('.places__list'); // место в DOM

// const cardItem = document.querySelector('#card-template').content.cloneNode(true); // сама карточка
/* или по отдельности
const cardItemTemplate= document.querySelector('#card-template');
const cardItem = cardItemTemplate.content.cloneNode(true); */

/*---------------------------------------*/

// const cardItemImage = cardItem.querySelector(".card__image");
// const cardItemTitle = cardItem.querySelector(".card__title");

// cardItemImage.src = //initialCards.link;
// cardItemTitle.textContent = //initialCards.name;

/*---------------------------------------*/

// const deleteButton = cardItem.querySelector(".card__delete-button");

/*---------------------------------------*/

function addCard(cardData, deleteCard) {
  const cardItem = document
    .querySelector("#card-template")
    .content.cloneNode(true);

  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTitle = cardItem.querySelector(".card__title");

  cardItemImage.src = cardData.link;
  cardItemTitle.textContent = cardData.name;

  const deleteCardButton = cardItem.querySelector(".card__delete-button");

  deleteCardButton.addEventListener("click", function (evt) {
    deleteCard(evt.target.parentElement);
  });

  return cardItem;
}

/*---------------------------------------*/

function deleteCard(card) {
  card.remove();
}

/*---------------------------------------*/

const cardPlace = document.querySelector(".places__list");

initialCards.forEach(function (index, deleteCard) {
  cardPlace.append(addCard(index));
});

/*---------------------------------------*/
