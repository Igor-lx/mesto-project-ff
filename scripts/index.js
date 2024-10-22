function createCard(cardData, deleteCardFunction) {
  const cardItem = document
    .querySelector("#card-template")
    .content.cloneNode(true);

  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTitle = cardItem.querySelector(".card__title");
  const deleteCardButton = cardItem.querySelector(".card__delete-button");

  /*--------------------------------------------------------------------------*/
  const cardItemDescription = cardItem.querySelector(".card__description");
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  /*--------------------------------------------------------------------------*/

  cardItemImage.src = cardData.link;
  cardItemImage.alt = 'фотография: "' + cardData.name + '"';
  cardItemTitle.textContent = cardData.name;

  /*--------------------------------------------------------------------------*/
  cardItemImage.addEventListener("error", function () {
    cardItemImage.classList.add(
      "card__image__load_failure__textstile",
      "card__image__load_failure"
    );
    cardItemTitle.classList.add("card__image__load_failure__textstile");
    cardItemTitle.textContent =
      "Упс! Изображение не найдено, но мы уже отправили за ним поисковую команду.";

    cardItemDescription.classList.add("card__image__load_failure__description");
    cardLikeButton.style.display = "none";
  });

  /*--------------------------------------------------------------------------*/

  deleteCardButton.addEventListener("click", function (evt) {
    deleteCardFunction(evt.target.parentElement);
  });

  return cardItem;
}

function deleteCardFunction(card) {
  card.remove();
}
const cardPlace = document.querySelector(".places__list");

initialCards.forEach(function (index) {
  cardPlace.append(createCard(index, deleteCardFunction));
});
