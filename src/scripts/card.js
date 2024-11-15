function createCard(
  cardsArray,
  deleteCallback,
  errorCallback,
  likeCallback,
  fullscreenCallback
) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);
  /* -------------------------------------------------------- */
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");

  cardItemTitle.textContent = cardsArray.name;
  cardItemImage.src = cardsArray.link;
  cardItemImage.alt = 'фотография: "' + cardsArray.name + '"';
  /* -------------------------------------------------------- */
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    deleteCallback(cardItem);
  });
  /* -------------------------------------------------------- */
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", (evt) => {
    likeCallback(evt.target);
  });
  /* -------------------------------------------------------- */
  cardItemImage.addEventListener("click", () => {
    fullscreenCallback(cardsArray);
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
  /* -------------------------------------------------------- */

  return cardItem;
}
/* ========================================================================================================= */
/* --------------------------------------- Callback Functions ---------------------------------------------- */

function deleteCard(cardItem) {
  cardItem.remove();
}
/* -------------------------------------------------------- */
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
/* -------------------------------------------------------- */
const popupedImage = document.querySelector(".popup__image");
const popupedImageCaption = document.querySelector(".popup__caption");

function openFullscreenImage(cardItemData) {
  popupedImage.src = cardItemData.link;
  popupedImage.alt = 'фотография: "' + cardItemData.name + '"';
  popupedImageCaption.textContent = cardItemData.name;
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
  cardItemImage.style.pointerEvents = "none";
}
/* ----------------------------- */
export {
  createCard,
  deleteCard,
  likeCard,
  openFullscreenImage,
  processImgDownldError,
};
/* ---------------------------- */
