//
import { openModal } from "./modal";
import {
  confirmDeleteModalWindow,
  confirmDeleteFormElement,
  currentDeleteElement,
  showButtonText,
  buttonTexts,
  likesModalWindow,
} from "../index";

export const likesModalHeader = document.querySelector(
  ".popup__title_likes-header"
);
export const likesModalTitle = document.querySelector(".popup__title_likes");
export const likersNameList = document.querySelector(".likers-name");

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
        confirmDeleteModalWindow,
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
    cardLikeButton,
    cardLikesCounter
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

  /* -----------------------------------------------------------------------------  модалка с теми кто  лайкнул ---------- */

  cardLikesCounter.addEventListener("click", () => {
    callbackFunctionsSet.showLikedUsers(cardItemData._id);
    likesModalHeader.textContent = "";
    likesModalTitle.textContent = "";
    likersNameList.textContent = "";
    openModal(likesModalWindow);
  });

  /* ---------------- */
  return cardItem;
}

/* ------------------------------------------------------------------------ */
export { createCard };
