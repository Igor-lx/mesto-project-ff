import { deleteNewplace } from "./api";
import { configAPI } from "../index";

/* ---------------------------------------------------- */

export const callbackFunctionsSet = {
  deleteCard,
  likeCard,
  processImgDownldError,
  showDeleteButton,
  openFullscreenImage,
};

/* ---------------------------------------------------- */

function showDeleteButton(cardItemData, userId, deleteButton) {
  if (cardItemData.owner._id !== userId) {
    deleteButton.remove();
    return false;
  }
  return true;
}

function deleteCard(cardId, cardElement) {
  deleteNewplace(cardId, configAPI)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

function openFullscreenImage(cardItemData) {
  popupImage.src = cardItemData.link;
  popupImage.alt = 'фотография: "' + cardItemData.name + '"';
  popupImageCaption.textContent = cardItemData.name;
  openModal(popupImageModalWindow);
}

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
