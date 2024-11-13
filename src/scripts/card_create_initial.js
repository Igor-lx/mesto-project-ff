function createCard(name, link, deleteCallback, errorCallback, likeCallback) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);

  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTitle = cardItem.querySelector(".card__title");
  const deleteCardButton = cardItem.querySelector(".card__delete-button");
  const cardLikeButton = cardItem.querySelector(".card__like-button");

  cardItemTitle.textContent = name;
  cardItemImage.src = link;
  // cardItemImage.setAttribute("src", link);  // а можно вот так
  cardItemImage.alt = 'фотография: "' + name + '"';

  deleteCardButton.addEventListener("click", function () {
    deleteCallback(cardItem);
  });

  cardLikeButton.addEventListener("click", function (evt) {
    likeCallback(evt.target);
  });

  /* -------------------------------------------------------------------- + выравнивание при ошибке загрузки img---- */
  const cardItemDescription = cardItem.querySelector(".card__description");

  cardItemImage.onerror = () => {
    errorCallback(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeButton
    );
  };
  /* --------------------------------------------------------------------------------------------------------------- */

  return cardItem;
}

function deleteCard(i) {
  i.remove();
}

function likeCard(i) {
  i.classList.toggle("card__like-button_is-active");
}

/* ----------------------------------------------------------------------------------------------------------------- */
function processImgDownldError(Image, Title, Description, Button) {
  Image.classList.add(
    "card__image__load_failure__textstile",
    "card__image__load_failure"
  );
  Title.classList.add("card__image__load_failure__textstile");
  Title.textContent =
    "Упс! Изображение не найдено, но мы уже отправили за ним поисковую команду.";
  Description.classList.add("card__image__load_failure__description");
  Button.style.display = "none";
}
/* ---------------------------------------------------------------------------------------------------------------- */

function renderCard(cards) {
  const cardPlace = document.querySelector(".places__list");

  if (Array.isArray(cards)) {
    cards.forEach(function (i) {
      cardPlace.append(
        createCard(i.name, i.link, deleteCard, processImgDownldError, likeCard)
      );
    });
  } else {
    cardPlace.prepend(
      createCard(
        cards.name,
        cards.link,
        deleteCard,
        processImgDownldError,
        likeCard
      )
    );
  }
}
/* ------------------------------------------------- ЭКСПОРТ ---- */
export { renderCard };
/* -------------------------------------------------------------- */
