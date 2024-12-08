function createCard(
  cardItemData,
  deleteCallback,
  errorCallback,
  likeCallback,
  fullscreenCallback
) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);
  /* ------------------------------------------------------ */
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");

  cardItemTitle.textContent = cardItemData.name;
  cardItemImage.src = cardItemData.link;
  cardItemImage.alt = 'фотография: "' + cardItemData.name + '"';
  /* ------------------------------------------------------ */
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    deleteCallback(cardItem);
  });
  /* ------------------------------------------------------ */
  const cardLikeButton = cardItem.querySelector(".card__like-button");

  const cardLikeCounter = cardItem.querySelector(".likes_counter");
  cardLikeCounter.textContent = cardItemData.likes.length;

  cardLikeButton.addEventListener("click", (evt) => {
    likeCallback(evt.target);
  });
  /* ------------------------------------------------------ */
  cardItemImage.addEventListener("click", () => {
    if (cardItemImage.classList.contains("card__image__load_failure")) {
      return;
    }
    fullscreenCallback(cardItemData);
  });
  /*---------- ++ обработчик ошибки загрузки img ---------- */
  const cardItemDescription = cardItem.querySelector(".card__description");

  cardItemImage.onerror = () => {
    errorCallback(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeButton
    );
  };
  /* ------------------------------------------------------ */

  return cardItem;
}

/* --------------------------------------- Callback Functions ---------------------------------------------- */

function deleteCard(cardItem) {
  cardItem.remove();
}
/* --------------------------------------------------------- */
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
/* ---- ++ функция выравнивания при ошибке загрузки img ---- */
function processImgDownldError(
  cardItemImage,
  cardItemTitle,
  cardItemDescription,
  cardLikeButton
) {
  cardItemImage.classList.add(
    "card__image__load_failure__textstile",
    "card__image__load_failure"
  );
  cardItemTitle.classList.add("card__image__load_failure__textstile");
  cardItemTitle.textContent =
    "Упс! Изображение не найдено, но мы уже отправили за ним поисковую команду.";
  cardItemDescription.classList.add("card__image__load_failure__description");
  cardLikeButton.style.display = "none";
  cardItemImage.style.cursor = "not-allowed";
}

/* ----------------------------- */
export { createCard, deleteCard, likeCard, processImgDownldError };
/* ---------------------------- */
