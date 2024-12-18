//

function createCard(cardItemData, userId, callbackFunctionsSet) {
  /* ------------------------------------------------------------------------ */
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);

  /* ------------------------------------------------------------------------ */
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");
  cardItemTitle.textContent = cardItemData.name;

  const cardItemDescription = cardItem.querySelector(".card__description");
  const cardLikeSection = cardItem.querySelector(".likes_section");
  const cardEditButton = cardItem.querySelector(".image__editname-button");

  cardItemImage.src = cardItemData.link;
  cardItemImage.alt = 'фотография: "' + cardItemData.name + '"';

  /* ------------------------------------------------------------------------ */
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");

  /* ------------------------------------------------------------------------ */
  const cardNamechangeButton = cardItem.querySelector(
    ".image__editname-button"
  );

  /* ------------------------------------------------------------------------ */
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const cardLikesCounter = cardItem.querySelector(".likes_counter");

  cardLikesCounter.textContent = cardItemData.likes.length;

  /* ---------------------------------------------------------------------- удаление кнопок если userID !== ownerID --------- */
  callbackFunctionsSet.showButtonsOnCard(
    cardItemData,
    userId,
    cardDeleteButton,
    cardNamechangeButton
  );

  /* ----------------------------------------------------------------- стиль кнопки лайка в зависимости от статуса лайка ---- */
  callbackFunctionsSet.IfAlreadyLiked(
    cardItemData.likes,
    userId,
    cardLikeButton,
    cardLikesCounter,
    cardItem
  );

  /* ------------------------------------------------------------------------------  слушатель кнопки удаления ------------- */
  if (cardDeleteButton) {
    cardDeleteButton.addEventListener("click", () => {
      callbackFunctionsSet.openConfirmDeleteModal(cardItemData, cardItem);
    });
  }

  /* ------------------------------------------------------------------------------  слушатель кнопки обновления   --------- */

  if (cardNamechangeButton) {
    cardNamechangeButton.addEventListener("click", () => {
      callbackFunctionsSet.openCardUpdateModal(
        cardItemData,
        cardItem,
        cardItemTitle
      );
    });
  }

  /* --------------------------------------------------------------------------------- слушатель кнопки лайка -------------- */
  if (cardLikeButton) {
    cardLikeButton.addEventListener("click", () => {
      callbackFunctionsSet.handleLikeCard(
        cardItemData._id,
        cardLikeButton,
        cardLikesCounter,
        cardItem
      );
    });
  }

  /* -------------------------------------------------------------------------  слушатель открытия модалки лайкнувших ----- */
  if (cardLikesCounter) {
    cardLikesCounter.addEventListener("click", () => {
      callbackFunctionsSet.openLikersModal(cardItemData._id, cardLikesCounter);
    });
  }
  /* ------------------------------------------------------------------------------ слушатель открытия на фулскрин  ------ */
  cardItemImage.addEventListener("click", () => {
    if (cardItemImage.classList.contains("card__image__load_failure")) {
      return;
    }
    callbackFunctionsSet.openFullscreenImage(
      cardItemData,
      cardLikeButton,
      cardLikesCounter,
      cardItem
    );
  });

  /* ------------------------------------------------------------------------ Обработчик ошибки при загрузке изображения -- */

  cardItemImage.addEventListener(
    "error",
    () => {
      callbackFunctionsSet.processImgDownldError(
        cardItemImage,
        cardItemTitle,
        cardItemDescription,
        cardLikeSection,
        cardEditButton
      );
    },
    { once: true }
  );

  /* ---------------- */
  return cardItem;
}

/* ===================================================================== related Functions ============= */

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

function changeLikesCounter(cardLikesCounter, likedCardData) {
  cardLikesCounter.classList.toggle("my_like_is-active");
  cardLikesCounter.textContent = likedCardData.likes.length;
}

function showButtonsOnCard(
  cardItemData,
  userId,
  cardDeleteButton,
  cardUpdateButton
) {
  if (cardItemData.owner._id !== userId) {
    cardDeleteButton.remove();
    cardUpdateButton.remove();
  }
}

/* ------------------------------------------------------------------------ */
export {
  createCard,
  deleteCard,
  likeCard,
  changeLikesCounter,
  showButtonsOnCard,
};
