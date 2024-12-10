//
import { openModal } from "./modal";
import {
  confirmDeleteModalWindow,
  confirmDeleteFormElement,
  currentDeleteElement,
  showButtonText,
  buttonTexts,
} from "../index";

function createCard(cardItemData, userId, callbackFunctionsSet) {
  /* ----------------------------------------------------------------- */
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);

  /* ----------------------------------------------------------------- */
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");

  /* ----------------------------------------------------------------- */
  cardItemTitle.textContent = cardItemData.name;
  cardItemImage.src = cardItemData.link;
  cardItemImage.alt = 'фотография: "' + cardItemData.name + '"';

  /* ----------------------------------------------------------------------------------  удаление карточки ------------------ */

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");

  if (
    callbackFunctionsSet.showDeleteButton(
      cardItemData,
      userId,
      cardDeleteButton
    )
  ) {
    cardDeleteButton.addEventListener("click", () => {
      currentDeleteElement.currentCardId = cardItemData._id;
      currentDeleteElement.currentCardElement = cardItem;
      showButtonText(
        true,
        false,
        false,
        confirmDeleteFormElement,
        buttonTexts.delete
      );
      openModal(confirmDeleteModalWindow);
    });
  }
  /* ------------------------------------------------------------------------------------- лайк карточки ------------------- */
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const cardLikesCounter = cardItem.querySelector(".likes_counter");

  cardLikesCounter.textContent = cardItemData.likes.length;

  callbackFunctionsSet.IfAlreadyLiked(
    cardItemData.likes,
    userId,
    cardLikeButton
  );

  cardLikeButton.addEventListener("click", () => {
    callbackFunctionsSet.likeCard(
      cardLikeButton,
      cardItemData._id,
      cardLikesCounter
    );
  });

  /* ---------------------------------------------------------------------------------- Открытие на фулскрин  ------------- */
  cardItemImage.addEventListener("click", () => {
    if (cardItemImage.classList.contains("card__image__load_failure")) {
      return;
    }
    callbackFunctionsSet.openFullscreenImage(cardItemData);
  });

  /* ------------------------------------------------------------------------ Обработчик ошибки при загрузке изображения -- */
  const cardItemDescription = cardItem.querySelector(".card__description");
  const cardLikeSection = cardItem.querySelector(".likes_section");

  cardItemImage.onerror = () => {
    callbackFunctionsSet.processImgDownldError(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeSection
    );
  };

  /* ---------------- */
  return cardItem;
}

/* ------------------------------------------------------------------------ */
export { createCard };
