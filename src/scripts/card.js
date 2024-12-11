//
import { openModal, closeModal } from "./modal";
import {toggleLike, deleteNewplace} from "./api"
import {callbackFunctionsSet, configAPI} from "../index"

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
      openModal(confirmDeleteModal);
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


/* ================================================================================================================ */

function IfAlreadyLiked(likes, userId, likeButton) {
  const alreadyLiked = likes.some((like) => like._id === userId);
  if (alreadyLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

function likeCard(cardLikeButton, cardId, cardLikesCounter) {
  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );
  toggleLike(cardId, isLiked, configAPI)
    .then((likedCardData) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikesCounter.textContent = likedCardData.likes.length;
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

/* --------------------------------------------------------------------------------------- */
const confirmDeleteModal = document.querySelector(
  ".popup_type_delete-confirm"
);

const confirmDeleteButton = confirmDeleteModal.querySelector(".popup__button");
const currentDeleteElement = {
  currentCardId: null,
  currentCardElement: null,
};


function showDeleteButton(cardItemData, userId, deleteButton) {
  if (cardItemData.owner._id !== userId) {
    deleteButton.remove();
    return false;
  }
  return true;
}

confirmDeleteButton.addEventListener("click", () => {
  if (
    currentDeleteElement.currentCardId &&
    currentDeleteElement.currentCardElement
  ) {
    callbackFunctionsSet.deleteCard(
      currentDeleteElement.currentCardId,
      currentDeleteElement.currentCardElement
    );
    currentDeleteElement.currentCardId = null;
    currentDeleteElement.currentCardElement = null;
  }
});

function deleteCard(cardId, cardElement) {
  deleteNewplace(cardId, configAPI)
    .then(() => {
      cardElement.remove();
      closeModal(confirmDeleteModal);
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

/* --------------------------------------------------------------------------------------- */

export { createCard, IfAlreadyLiked, likeCard, showDeleteButton, deleteCard };
