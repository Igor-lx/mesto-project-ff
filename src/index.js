//

import "./index.css";

import {
  createCard,
  deleteCard,
  likeCard,
  changeLikesCounter,
} from "./scripts/card";

import { openModal, closeModal } from "./scripts/modal";

/* --------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------- */
import {
  getUserData,
  getInitialCards,
  editUserData,
  editAvatar,
  addNewplace,
  deleteNewplace,
  toggleLike,
  editCardName,
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

/* --------------------------------------------------------------------------- */
let userId = null;

/* ---------------- */
const profileFormElement = document.querySelector('[name="edit-profile"]');
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalWindow = document.querySelector(".popup_type_edit");
const profileInputfieldName = document.querySelector('[name="person_name"]');
const profileInputfieldJob = document.querySelector(
  '[name="person_description"]'
);
/* ---------------- */
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

/* ---------------- */
const newplaceFormElement = document.querySelector('[name="new-place"]');
const newplaceAddButton = document.querySelector(".profile__add-button");
const newplaceModalWindow = document.querySelector(".popup_type_new-card");
const newplaceInputfieldName = document.querySelector('[name="newplace_name"]');
const newplaceInputfieldLink = document.querySelector('[name="newplace_url"]');

/* ---------------- */
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageAutor = document.querySelector(".popup__autor");
const popupImageModalWindow = document.querySelector(".popup_type_image");

/* ---------------- */
const avtarFormElement = document.querySelector('[name="edit_avatar"]');
const avatarEditButton = document.querySelector(".edit_avatar");
const avatarModalWindow = document.querySelector(".popup_type_avatar");
const avtarInputfield = document.querySelector('[name="avatar_url"]');

/* ---------------- */
const confirmDeleteModalWindow = document.querySelector(
  ".popup_type_delete-confirm"
);
const confirmDeleteButton =
  confirmDeleteModalWindow.querySelector(".popup__button");

/* ---------------- */
const likesModalWindow = document.querySelector(".popup_type_likes");
const likesModalName = document.querySelector(".popup_likes_image_name");
const likesModalAutor = document.querySelector(".popup_likes_image_autor");
const likesModalLikersTitle = document.querySelector(".popup__title_likes");
const likersNameList = document.querySelector(".likers-names");

/* --------------------------------------------------------------------------- */
const changeCardNameModalWindow = document.querySelector(
  ".popup_type_card_name_change"
);
const changeCardNameFormElement = document.querySelector(
  '[name="edit_cardname"]'
);
const changeCardNameInputfield = document.querySelector(
  '[name="edit_cardname_input"]'
);

/* --------------------------------------------------------------------------- */

const buttonTexts = {
  save: {
    loadingText: "Сохранение...",
    completedText: "Сохранено",
  },
  delete: {
    loadingText: "Удаление...",
    completedText: "Удалено",
  },
};

/* --------------------------------------------------------------------------- */

const currentCardData = {
  name: null,
  currentCardId: null,
  currentCardElement: null,
  link: null,
};

const newCardData = {
  name: null,
  link: null,
};

const newUserData = {
  name: null,
  about: null,
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

    initialCardsArray.reverse().forEach((cardItemData) => {
      renderCard(cardItemData);
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

/* ------------------------------------------------------------------------ ------ открытие модальных окон страницы ---------- */

/* --------------------------------------------------------------- профайл*/
profileEditButton.addEventListener("click", openProfileModal);

function openProfileModal() {
  showButtonText(true, false, false, profileFormElement, buttonTexts.save);
  profileInputfieldName.value = profileName.textContent;
  profileInputfieldJob.value = profileJob.textContent;
  openModal(profileModalWindow);
  clearValidation(profileFormElement, configValidation);
  refreshInputProfile(profileFormElement);
}

/* ------------------------------------------------------------ новое место*/
newplaceAddButton.addEventListener("click", openNewplaceModal);

function openNewplaceModal() {
  showButtonText(true, false, false, newplaceFormElement, buttonTexts.save);
  newplaceFormElement.reset();
  openModal(newplaceModalWindow);
  clearValidation(newplaceFormElement, configValidation);
  clearInputFields(newplaceFormElement);
}

/* ---------------------------------------------------------------- аватар*/
avatarEditButton.addEventListener("click", openAvatarModal);

function openAvatarModal() {
  showButtonText(true, false, false, avtarFormElement, buttonTexts.save);
  avtarFormElement.reset();
  openModal(avatarModalWindow);
  clearValidation(avtarFormElement, configValidation);
  clearInputFields(avtarFormElement);
}

/* ----------------------------------------------------------------------------------- сабмит формы профиля ------------ */
profileFormElement.addEventListener("submit", submitProfile);

function submitProfile(evt) {
  evt.preventDefault();

  newUserData.name = profileInputfieldName.value;
  newUserData.about = profileInputfieldJob.value;

  const isProfileNameChanged = newUserData.name !== profileName.textContent;
  const isProfileJobChanged = newUserData.about !== profileJob.textContent;

  if (!isProfileNameChanged && !isProfileJobChanged) {
    console.log(
      "Данные не изменились, запрос на сервер не был отправлен за ненадобностью."
    );
    closeModal(profileModalWindow);
    newUserData.name = null;
    newUserData.about = null;
    return;
  }

  showButtonText(false, true, false, profileFormElement, buttonTexts.save);

  editUserData(newUserData, configAPI)
    .then((updatedUserData) => {
      profileName.textContent = updatedUserData.name;
      profileJob.textContent = updatedUserData.about;
      closeModal(profileModalWindow);
      newUserData.name = null;
      newUserData.about = null;
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() =>
      showButtonText(false, false, true, profileFormElement, buttonTexts.save)
    );
}

/* ------------------------------------------------------------------------------- сабмит формы новой карточки -------- */

newplaceFormElement.addEventListener("submit", submitNewplace);

function submitNewplace(evt) {
  evt.preventDefault();

  newCardData.name = newplaceInputfieldName.value;
  newCardData.link = newplaceInputfieldLink.value;

  showButtonText(false, true, false, newplaceFormElement, buttonTexts.save);

  addNewplace(newCardData, configAPI)
    .then((addedCard) => {
      renderCard(addedCard);
      closeModal(newplaceModalWindow);
      newCardData.name = null;
      newCardData.link = null;
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() =>
      showButtonText(false, false, true, newplaceFormElement, buttonTexts.save)
    );
}

/* ----------------------------------------------------------------------------------- сабмит формы аватара ---------- */
avtarFormElement.addEventListener("submit", submitAvatar);

function submitAvatar(event) {
  event.preventDefault();

  const avatarNewUrl = avtarInputfield.value;

  showButtonText(false, true, false, avtarFormElement, buttonTexts.save);

  editAvatar(avatarNewUrl, configAPI)
    .then((updatedData) => {
      profileAvatar.style.backgroundImage = `url(${updatedData.avatar})`;
      closeModal(avatarModalWindow);
    })
    .catch((error) => console.error(`Ошибка: ${error}`))
    .finally(() =>
      showButtonText(false, false, true, avtarFormElement, buttonTexts.save)
    );
}

/* ------------------------------------------------------------------------------------------ showButtonText ------------- */

function showButtonText(
  ifOpened,
  ifLoading,
  ifCompleted,
  formElement,
  buttonText
) {
  const submitButton = formElement.querySelector(".popup__button");

  if (!submitButton.dataset.originalText) {
    submitButton.dataset.originalText = submitButton.textContent;
  }

  if (ifOpened) {
    submitButton.textContent = submitButton.dataset.originalText;
  } else if (ifLoading) {
    submitButton.textContent = buttonText.loadingText;
  } else if (ifCompleted) {
    submitButton.textContent = buttonText.completedText;
  }
}

/* ---------------------------------------------------------------------------------- clear/refresh InputFields----------- */

function clearInputFields(formElement) {
  const clearFormButon = formElement
    .closest(".popup__content")
    .querySelector(".clear_form");
  clearFormButon.addEventListener("click", () => {
    formElement.reset();
    clearValidation(formElement, configValidation);
  });
}

function refreshInputProfile(formElement) {
  const clearFormButon = formElement
    .closest(".popup__content")
    .querySelector(".clear_form");
  clearFormButon.addEventListener("click", () => {
    clearValidation(formElement, configValidation);
    profileInputfieldName.value = profileName.textContent;
    profileInputfieldJob.value = profileJob.textContent;
  });
}

function refreshInputChangeName(formElement, currentCardName) {
  const clearFormButon = formElement
    .closest(".popup__content")
    .querySelector(".clear_form");
  clearFormButon.addEventListener("click", () => {
    clearValidation(formElement, configValidation);
    changeCardNameInputfield.value = currentCardName;
  });
}

/* ---------------------------------------------------------------------------------------- Callback Functions ---------- */

const callbackFunctionsSet = {
  showButtonsOnCard,
  openConfirmDeleteModal,
  openChangeCardNameModal,
  IfAlreadyLiked,
  handleLikeCard,
  openFullscreenImage,
  processImgDownldError,
  openLikersModal,
  showLikedUsers,
};

/* --------------------------------------------------------------------- */
function showButtonsOnCard(
  cardItemData,
  userId,
  cardDeleteButton,
  cardNamechangeButton
) {
  if (cardItemData.owner._id !== userId) {
    cardDeleteButton.remove();
    cardNamechangeButton.remove();
  }
}

/* -------------------- открытие модальных окон карточки (листнеры в карточке) ---- */

/* ----------------------------------------------------------------------- удаление */

function openConfirmDeleteModal(cardItemData, cardItem) {
  showButtonText(
    true,
    false,
    false,
    confirmDeleteModalWindow,
    buttonTexts.delete
  );
  currentCardData.currentCardId = cardItemData._id;
  currentCardData.currentCardElement = cardItem;
  openModal(confirmDeleteModalWindow);
}

/* ---------------------------------------------------------------- изменение имени */

function openChangeCardNameModal(cardItemData, cardItem) {
  showButtonText(
    true,
    false,
    false,
    changeCardNameModalWindow,
    buttonTexts.save
  );

  currentCardData.currentCardId = cardItemData._id;
  currentCardData.currentCardElement = cardItem;
  currentCardData.link = cardItemData.link;
  currentCardData.name = cardItemData.name;

  changeCardNameInputfield.value = cardItemData.name;

  openModal(changeCardNameModalWindow);
  clearValidation(changeCardNameFormElement, configValidation);
  refreshInputChangeName(changeCardNameFormElement, cardItemData.name);
}

/* ---------------------------------------------------------- */

changeCardNameFormElement.addEventListener("submit", changeCardName);

function changeCardName(evt) {
  evt.preventDefault();

  newCardData.name = changeCardNameInputfield.value;
  newCardData.link = currentCardData.link;

  /*
  const isNewCardName = newCardData.name === currentCardData.name;

  if (isNewCardName) {
    console.log(
      "Данные не изменились, запрос на сервер не был отправлен за ненадобностью."
    );
    closeModal(changeCardNameModalWindow);
    currentCardData.currentCardId = null;
    currentCardData.currentCardElement = null;
    currentCardData.link = null;
    return;
  }

  showButtonText(
    false,
    true,
    false,
    changeCardNameModalWindow,
    buttonTexts.save
  );
  */

  Promise.all([
    deleteNewplace(currentCardData.currentCardId, configAPI),
    addNewplace(newCardData, configAPI),
  ])
    .then(([deleteResult, addedCard]) => {
      deleteCard(currentCardData.currentCardElement);
      renderCard(addedCard);
      closeModal(changeCardNameModalWindow);
      currentCardData.currentCardId = null;
      currentCardData.currentCardElement = null;
      currentCardData.link = null;
      newCardData.name = null;
      newCardData.link = null;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      showButtonText(
        false,
        false,
        true,
        changeCardNameModalWindow,
        buttonTexts.save
      );
    });
}

/* ----------------------------------------------------------- открытие на фулскрин */
function openFullscreenImage(cardItemData) {
  popupImage.src = cardItemData.link;
  popupImage.alt = 'фотография: "' + cardItemData.name + '"';
  popupImageCaption.textContent = cardItemData.name;
  popupImageAutor.textContent = "Автор: " + cardItemData.owner.name;
  openModal(popupImageModalWindow);
}

/* ------------------------------------------------------------ модалка лайкнувших */
function openLikersModal() {
  likesModalName.textContent = "";
  likesModalAutor.textContent = "";
  likesModalLikersTitle.textContent = "";
  likersNameList.textContent = "";

  openModal(likesModalWindow);
}

/* -- не сallback. слушатель кнопки подтверждения удаления + handle Delete Card -- */

confirmDeleteButton.addEventListener("click", handleDeleteCard);

function handleDeleteCard() {
  showButtonText(
    false,
    true,
    false,
    confirmDeleteModalWindow,
    buttonTexts.delete
  );
  deleteNewplace(currentCardData.currentCardId, configAPI)
    .then(() => {
      deleteCard(currentCardData.currentCardElement);
      closeModal(confirmDeleteModalWindow);
      currentCardData.currentCardId = null;
      currentCardData.currentCardElement = null;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      showButtonText(
        false,
        false,
        true,
        confirmDeleteModalWindow,
        buttonTexts.delete
      );
    });
}

/* --------------------------------------------------------------------- */

function IfAlreadyLiked(likes, userId, likeButton, likesCounter) {
  const alreadyLiked = likes.some((like) => like._id === userId);
  if (alreadyLiked) {
    likeButton.classList.add("card__like-button_is-active");
    likesCounter.classList.add("my_like_is-active");
  }
}

function handleLikeCard(cardId, cardLikeButton, cardLikesCounter) {
  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );
  toggleLike(cardId, isLiked, configAPI)
    .then((likedCardData) => {
      likeCard(cardLikeButton);
      changeLikesCounter(cardLikesCounter, likedCardData);
    })

    .catch((error) => console.log(`Ошибка: ${error}`));
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

/* --------------------------------------------------------------------- */

function showLikedUsers(cardId) {
  getInitialCards(configAPI)
    .then((cards) => {
      const card = cards.find((card) => card._id === cardId);

      if (card) {
        likesModalName.textContent = `${card.name}`;
        likesModalAutor.textContent = `Автор: ${card.owner.name}`;
        likesModalName.classList.remove("popup__content_no_likes");

        if (card.likes.length > 0) {
          const likersNames = card.likes.map((liker) => liker.name).join(", ");

          likesModalLikersTitle.textContent = "Это фото понравилось:";
          likersNameList.textContent = likersNames;
        } else {
          likesModalName.textContent = "У этой карточки нет лайков";
          likesModalName.classList.add("popup__content_no_likes");
          likesModalAutor.textContent = "";
        }
      } else {
        likesModalName.textContent = "Карточка не найдена";
      }
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

/* --------------------------------------------------------------------------------------------------------------------- */

enableValidation(configValidation);

/* ===================================================================================================================== */
/* ===================================================================================================================== */

//  test images

//  https://cdn.culture.ru/images/eb564802-73d5-5013-a8c3-2b9ca85a2d8f
//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
//  https://img.goodfon.ru/original/1600x900/9/ca/fable-dzhek-iz-teni-maska.jpg
