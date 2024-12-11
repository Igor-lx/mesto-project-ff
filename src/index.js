//

import "./index.css";

import { createCard } from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";

/* ------------------------------------------------------- */
import { enableValidation, clearValidation } from "./scripts/validation";

const configValidation = {
  formSelector: ".popup__form",
  inputfieldSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputfieldErrorStyleClass: "popup__input_error",
  textmessageErrorStyleClass: "popup__error-message_visible",
  errorClassPostfix: "-error",
};

/* ------------------------------------------------------- */
import {
  getUserData,
  getInitialCards,
  editUserData,
  editAvatar,
  addNewplace,
  deleteNewplace,
  toggleLike,
} from "./scripts/api";

const configAPI = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  userDataEndpoint: "/users/me",
  userAvatarEndpoint: "/users/me/avatar",
  cardsEndpoint: "/cards",
  likesEndpoint: "/cards/likes/",
  headers: {
    authorization: "4539d8f5-d367-42ca-b41c-d2390bc8734d",
    "Content-Type": "application/json",
  },
};

/* ------------------------------------------------------- */

const profileFormElement = document.querySelector('[name="edit-profile"]');
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalWindow = document.querySelector(".popup_type_edit");
const profileInputfieldName = document.querySelector('[name="person_name"]');
const profileInputfieldJob = document.querySelector(
  '[name="person_description"]'
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const newplaceFormElement = document.querySelector('[name="new-place"]');
const newplaceAddButton = document.querySelector(".profile__add-button");
const newplaceModalWindow = document.querySelector(".popup_type_new-card");
const newplaceInputfieldName = document.querySelector('[name="newplace_name"]');
const newplaceInputfieldLink = document.querySelector('[name="newplace_url"]');

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageModalWindow = document.querySelector(".popup_type_image");

const avtarFormElement = document.querySelector('[name="edit_avatar"]');
const avatarEditButton = document.querySelector(".edit_avatar");
const avatarModalWindow = document.querySelector(".popup_type_avatar");
const avtarInputfield = document.querySelector('[name="avatar_url"]');

export const confirmDeleteModal = document.querySelector(
  ".popup_type_delete-confirm"
);

let userId = null;

/* -------------------------------------------------------- */
const confirmDeleteButton = confirmDeleteModal.querySelector(".popup__button");
export const currentDeleteElement = {
  currentCardId: null,
  currentCardElement: null,
};

/* --------------------------------------------------------------------------------- получение с сервера и  рендер ------ */

const cardPlace = document.querySelector(".places__list");

function renderCard(cardItemData) {
  cardPlace.prepend(createCard(cardItemData, userId, callbackFunctionsSet));
}

Promise.all([getUserData(configAPI), getInitialCards(configAPI)])
  .then(([userData, initialCardsArray]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCardsArray.reverse().forEach((card) => {
      renderCard(card);
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

/* ----------------------------------------------------------------------------------- открытие модальных окон ---------- */

/* --------------------------------------------------------------- профайл*/
profileEditButton.addEventListener("click", openProfileModal);

function openProfileModal() {
  profileInputfieldName.value = profileName.textContent;
  profileInputfieldJob.value = profileJob.textContent;
  openModal(profileModalWindow);
  clearValidation(profileFormElement, configValidation);
}

/* ------------------------------------------------------------ новое место*/
newplaceAddButton.addEventListener("click", openNewplaceModal);

function openNewplaceModal() {
  newplaceFormElement.reset();
  openModal(newplaceModalWindow);
  clearValidation(newplaceFormElement, configValidation);
}

/* ---------------------------------------------------------------- аватар*/
avatarEditButton.addEventListener("click", openAvatarModal);

function openAvatarModal() {
  avtarFormElement.reset();
  openModal(avatarModalWindow);
  clearValidation(avtarFormElement, configValidation);
}

/* ----------------------------------------------------------------------------------- сабмит формы профиля ------------ */
profileFormElement.addEventListener("submit", submitProfile);

function submitProfile(evt) {
  evt.preventDefault();

  const newUserData = {
    name: profileInputfieldName.value,
    about: profileInputfieldJob.value,
  };

  showSaving(true, profileFormElement);

  editUserData(newUserData, configAPI)
    .then((updatedUserData) => {
      profileName.textContent = updatedUserData.name;
      profileJob.textContent = updatedUserData.about;
      closeModal(profileModalWindow);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => showSaving(false, profileFormElement));
}

/* ------------------------------------------------------------------------------- сабмит формы новой карточки -------- */

newplaceFormElement.addEventListener("submit", submitNewplace);

function submitNewplace(evt) {
  evt.preventDefault();

  const newCardData = {
    name: newplaceInputfieldName.value,
    link: newplaceInputfieldLink.value,
  };

  showSaving(true, newplaceFormElement);

  addNewplace(newCardData, configAPI)
    .then((addedCard) => {
      renderCard(addedCard);
      closeModal(newplaceModalWindow);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => showSaving(false, newplaceFormElement));
}

/* ----------------------------------------------------------------------------------- сабмит формы аватара ---------- */
avtarFormElement.addEventListener("submit", submitAvatar);

function submitAvatar(event) {
  event.preventDefault();

  const avatarNewUrl = avtarInputfield.value;

  showSaving(true, avtarFormElement);

  editAvatar(avatarNewUrl, configAPI)
    .then((updatedData) => {
      profileAvatar.style.backgroundImage = `url(${updatedData.avatar})`;
      closeModal(avatarModalWindow);
    })
    .catch((error) => console.error(`Ошибка: ${error}`))
    .finally(() => showSaving(false, avtarFormElement));
}

/* ------------------------------------------------------------------------------------------ showSaving ------------- */

function showSaving(ifLoading, formElement) {
  const submitButton = formElement.querySelector(".popup__button");

  if (ifLoading) {
    submitButton.dataset.buttonText = submitButton.textContent;
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = submitButton.dataset.buttonText;
  }
}

/* ------------------------------------------------------------------------------------- Callback Functions ---------- */

const callbackFunctionsSet = {
  deleteCard,
  likeCard,
  processImgDownldError,
  showDeleteButton,
  openFullscreenImage,
  IfAlreadyLiked,
};

/* --------------------------------------------------------------------- */
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
    closeModal(confirmDeleteModal);

    currentDeleteElement.currentCardId = null;
    currentDeleteElement.currentCardElement = null;
  }
});

function deleteCard(cardId, cardElement) {
  deleteNewplace(cardId, configAPI)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

/* --------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------- */
function openFullscreenImage(cardItemData) {
  popupImage.src = cardItemData.link;
  popupImage.alt = 'фотография: "' + cardItemData.name + '"';
  popupImageCaption.textContent = cardItemData.name;
  openModal(popupImageModalWindow);
}

/* --------------------------------------------------------------------- */
function processImgDownldError(
  cardItemImage,
  cardItemTitle,
  cardItemDescription,
  cardLikeSection
) {
  cardItemImage.classList.add(
    "card__image__load_failure__textstile",
    "card__image__load_failure"
  );
  cardItemTitle.classList.add("card__image__load_failure__textstile");
  cardItemTitle.textContent =
    "Упс! Изображение не найдено, но мы уже отправили за ним поисковую команду.";
  cardItemDescription.classList.add("card__image__load_failure__description");
  cardLikeSection.style.display = "none";
  cardItemImage.style.cursor = "not-allowed";
}

/* -------------------------------------------------------------------------------------------------------------------- */

enableValidation(configValidation);

/* ==================================================================================================================== */
/* ==================================================================================================================== */

//  test images

//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
// https://img.goodfon.ru/original/1600x900/9/ca/fable-dzhek-iz-teni-maska.jpg
