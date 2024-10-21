function addCard(cardData, deleteCardFunction) {
  const cardItem = document
    .querySelector("#card-template")
    .content.cloneNode(true);

  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTitle = cardItem.querySelector(".card__title");
  const deleteCardButton = cardItem.querySelector(".card__delete-button");

  cardItemImage.src = cardData.link;
  cardItemTitle.textContent = cardData.name;

  deleteCardButton.addEventListener("click", function (evt) {
    deleteCardFunction(evt.target.parentElement);
  });

  return cardItem;
}

function deleteCardFunction(card) {
  card.remove();
}

initialCards.forEach(function (index) {
  const cardPlace = document.querySelector(".places__list");
  cardPlace.append(addCard(index, deleteCardFunction));
});
