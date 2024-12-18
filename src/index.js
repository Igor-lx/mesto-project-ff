//

import "./index.css";

import {
  createCard,
  deleteCard,
  likeCard,
  changeLikesCounter,
  showButtonsOnCard,
} from "./scripts/card";

import { openModal, closeModal } from "./scripts/modal";
import {
  showLikedUsers,
  clearLikersModalTextcontent,
  likersModalNodes,
} from "./scripts/showLikedUsers";
import { refreshPage } from "./scripts/refreshPage";
import {
  refreshInputFields,
  clearInputFields,
} from "./scripts/refreshInputfields";
import { showButtonText, showButtonTextParams } from "./scripts/showButtonText";
import { switchModal, clearObjectValues } from "./scripts/support";
import { validateFileType } from "./scripts/validateFileType";
import { processImgDownldError } from "./scripts/imgDnldError";

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
  getCardsFromServer,
  editUserData,
  editAvatar,
  addNewplace,
  deleteNewplace,
  toggleLike,
  getFileType,
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

/* ---------------- */
const profileNodes = {
  editButton: document.querySelector(".profile__edit-button"),
  modalWindow: document.querySelector(".popup_type_edit"),
  formElement: document.querySelector('[name="edit-profile"]'),
  inputfieldName: document.querySelector('[name="person_name"]'),
  inputfieldJob: document.querySelector('[name="person_description"]'),
  name: document.querySelector(".profile__title"),
  job: document.querySelector(".profile__description"),
  avatar: document.querySelector(".profile__image"),
};

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
const avatarFormElement = document.querySelector('[name="edit_avatar"]');
const avatarEditButton = document.querySelector(".edit_avatar");
const avatarModalWindow = document.querySelector(".popup_type_avatar");
const avatarInputfield = document.querySelector('[name="avatar_url"]');

/* ---------------- */
const confirmDeleteModalWindow = document.querySelector(
  ".popup_type_delete-confirm"
);
const confirmDeleteButton =
  confirmDeleteModalWindow.querySelector(".popup__button");

/* ---------------- */
const cardUpdateModalWindow = document.querySelector(
  ".popup_type_card_name_change"
);
const cardUpdareFormElement = document.querySelector('[name="edit_cardname"]');
const cardUpdateInputfield = document.querySelector(
  '[name="edit_cardname_input"]'
);

const cardUpdateModalButton =
  cardUpdateModalWindow.querySelector(".popup__button");

/* ---------------- */
const confrimUpdateModalWindow = document.querySelector(
  ".popup_type_update-confirm"
);

const confrimUpdateModalButton =
  confrimUpdateModalWindow.querySelector(".popup__button");

/* ---------------- */
const refreshPageButton = document.querySelector(".refresh-card_button");

/* ---------------- */
const likeButtonFullscreen = document.querySelector(
  ".card__like-button_fullscreen"
);

const likeCounterFullscreen = document.querySelector(
  ".likes_counter_fullscreen"
);

/* ---------------- */
const errorModalWindow = document.querySelector(".popup_type_error");

/* --------------------------------------------------------------------------- */
let userId = null;

/* --------------------------------------------------------------------------- */
const currentCardData = {
  name: null,
  cardId: null,
  cardElement: null,
  link: null,
  userId: null,
  likes: null,
  likeButtonNode: null,
  likeCounterNode: null,
};

const newCardData = {
  name: null,
  link: null,
};

const updatedUserData = {
  name: null,
  about: null,
};

/* ----------------------------------------------------------------------------- INITIAL получение с сервера и  рендер ------ */

const cardPlace = document.querySelector(".places__list");

function renderCard(cardItemData) {
  cardPlace.prepend(createCard(cardItemData, userId, callbackFunctionsSet));
}

Promise.all([getUserData(configAPI), getCardsFromServer(configAPI)])
  .then(([userData, initialCardsArray]) => {
    userId = userData._id;
    profileNodes.name.textContent = userData.name;
    profileNodes.job.textContent = userData.about;
    profileNodes.avatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCardsArray.reverse().forEach((cardItemData) => {
      renderCard(cardItemData);
    });
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

/* ----------------------------------------------------------------------------------------  обновление страницы ----------- */

refreshPageButton.addEventListener("click", () =>
  refreshPage(
    getUserData,
    getCardsFromServer,
    configAPI,
    userId,
    deleteCard,
    renderCard
  )
);

/* ------------------------------------------------------------------------------ открытие модальных окон страницы ---------- */

/* ----------------------------------------------------------------------- профайл*/
profileNodes.editButton.addEventListener("click", openProfileModal);

function openProfileModal() {
  showButtonText(
    true,
    false,
    false,
    profileNodes.formElement,
    showButtonTextParams.save
  );
  profileNodes.inputfieldName.value = profileNodes.name.textContent;
  profileNodes.inputfieldJob.value = profileNodes.job.textContent;
  openModal(profileNodes.modalWindow);
  clearValidation(profileNodes.formElement, configValidation);

  refreshInputFields(
    profileNodes.formElement,
    {
      inputField1: profileNodes.inputfieldName,
      inputField2: profileNodes.inputfieldJob,
      valueSource1: profileNodes.name,
      valueSource2: profileNodes.job,
    },
    clearValidation,
    configValidation
  );

  //refreshProfileInputFields(profileNodes.formElement);
}

/* ------------------------------------------------------------------ новое место*/
newplaceAddButton.addEventListener("click", openNewplaceModal);

function openNewplaceModal() {
  showButtonText(
    true,
    false,
    false,
    newplaceFormElement,
    showButtonTextParams.save
  );
  newplaceFormElement.reset();
  openModal(newplaceModalWindow);
  clearValidation(newplaceFormElement, configValidation);
  clearInputFields(newplaceFormElement, clearValidation, configValidation);
}

/* ----------------------------------------------------------------------- аватар*/
avatarEditButton.addEventListener("click", openAvatarModal);

function openAvatarModal() {
  showButtonText(
    true,
    false,
    false,
    avatarFormElement,
    showButtonTextParams.save
  );
  avatarFormElement.reset();
  openModal(avatarModalWindow);
  clearValidation(avatarFormElement, configValidation);
  clearInputFields(avatarFormElement, clearValidation, configValidation);
}

/* ----------------------------------------------------------------------------------- сабмит формы профиля ------------ */
profileNodes.formElement.addEventListener("submit", submitProfile);

function submitProfile(evt) {
  evt.preventDefault();

  updatedUserData.name = profileNodes.inputfieldName.value;
  updatedUserData.about = profileNodes.inputfieldJob.value;

  const isProfileNameChanged =
    updatedUserData.name !== profileNodes.name.textContent;
  const isProfileJobChanged =
    updatedUserData.about !== profileNodes.job.textContent;

  if (!isProfileNameChanged && !isProfileJobChanged) {
    console.log(
      "Данные не изменились, запрос на сервер не был отправлен за ненадобностью."
    );
    closeModal(profileNodes.modalWindow);
    clearObjectValues(updatedUserData);

    return;
  }

  showButtonText(
    false,
    true,
    false,
    profileNodes.formElement,
    showButtonTextParams.save
  );

  editUserData(updatedUserData, configAPI)
    .then((updatedUserData) => {
      profileNodes.name.textContent = updatedUserData.name;
      profileNodes.job.textContent = updatedUserData.about;
      closeModal(profileNodes.modalWindow);
      clearObjectValues(updatedUserData);
      showButtonText(
        false,
        false,
        true,
        profileNodes.formElement,
        showButtonTextParams.save
      );
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
      showButtonText(
        false,
        false,
        true,
        profileNodes.formElement,
        showButtonTextParams.error
      );
    });
}

/* ------------------------------------------------------------------------------- сабмит формы новой карточки -------- */

newplaceFormElement.addEventListener("submit", submitNewplace);

function submitNewplace(evt) {
  evt.preventDefault();

  newCardData.name = newplaceInputfieldName.value;
  newCardData.link = newplaceInputfieldLink.value;

  showButtonText(
    false,
    true,
    false,
    newplaceFormElement,
    showButtonTextParams.save
  );

  validateFileType(getFileType, newCardData.link, "Content-Type", "image/")
    .catch((error) => {
      showButtonText(
        false,
        false,
        true,
        newplaceFormElement,
        showButtonTextParams.error
      );
      switchModal(newplaceModalWindow, errorModalWindow, openModal, closeModal);
      return Promise.reject(error);
    })
    .then(() => {
      return addNewplace(newCardData, configAPI);
    })
    .then((addedCard) => {
      renderCard(addedCard);
      showButtonText(
        false,
        false,
        true,
        newplaceFormElement,
        showButtonTextParams.save
      );
      clearObjectValues(newCardData);
      closeModal(newplaceModalWindow);
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`);
      showButtonText(
        false,
        false,
        true,
        newplaceFormElement,
        showButtonTextParams.error
      );
    });
}

/* ----------------------------------------------------------------------------------- сабмит формы аватара ---------- */
avatarFormElement.addEventListener("submit", submitAvatar);

function submitAvatar(event) {
  event.preventDefault();

  const avatarNewUrl = avatarInputfield.value;

  showButtonText(
    false,
    true,
    false,
    avatarFormElement,
    showButtonTextParams.save
  );

  validateFileType(getFileType, avatarNewUrl, "Content-Type", "image/")
    .catch((error) => {
      showButtonText(
        false,
        false,
        true,
        avatarFormElement,
        showButtonTextParams.error
      );
      switchModal(avatarModalWindow, errorModalWindow, openModal, closeModal);
      return Promise.reject(error);
    })
    .then((validUrl) => {
      return editAvatar(validUrl, configAPI);
    })
    .then((updatedData) => {
      profileNodes.avatar.style.backgroundImage = `url(${updatedData.avatar})`;
      showButtonText(
        false,
        false,
        true,
        avatarFormElement,
        showButtonTextParams.save
      );
      closeModal(avatarModalWindow);
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`);
      showButtonText(
        false,
        false,
        true,
        avatarFormElement,
        showButtonTextParams.error
      );
    });
}

/* ---------------------------------------------------------------------------------------- Callback Functions ---------- */

const callbackFunctionsSet = {
  openConfirmDeleteModal,
  openLikersModal,
  openCardUpdateModal,
  openFullscreenImage,
  IfAlreadyLiked,
  handleLikeCard,
  showButtonsOnCard, //import
  processImgDownldError, //import
  showLikedUsers, //import
};

/* ----------------------- открытие модальных окон карточки (листнеры в карточке) ---- */

/* -------------------------------------------------------------------------- удаление */

function openConfirmDeleteModal(cardItemData, cardItem) {
  showButtonText(
    true,
    false,
    false,
    confirmDeleteModalWindow,
    showButtonTextParams.delete
  );
  currentCardData.cardId = cardItemData._id;
  currentCardData.cardElement = cardItem;

  openModal(confirmDeleteModalWindow);
}

/* ----------------------------------------------------------------- модалка лайкнувших */
function openLikersModal(cardId, cardLikesCounter) {
  clearLikersModalTextcontent(likersModalNodes);
  openModal(likersModalNodes.modalWindow);
  showLikedUsers(cardId, cardLikesCounter, getCardsFromServer, configAPI);
}

/* ----------------------------------------------------------------- обновление карточки */

function openCardUpdateModal(cardItemData, cardItem, cardNameNode) {
  currentCardData.cardId = cardItemData._id;
  currentCardData.cardElement = cardItem;
  currentCardData.link = cardItemData.link;
  currentCardData.name = cardItemData.name;
  cardUpdateInputfield.value = cardItemData.name;

  openModal(cardUpdateModalWindow);
  clearValidation(cardUpdareFormElement, configValidation);
  refreshInputFields(
    cardUpdareFormElement,
    {
      inputField1: cardUpdateInputfield,
      inputField2: null,
      valueSource1: cardNameNode,
      valueSource2: null,
    },
    clearValidation,
    configValidation
  );
}

// подтвержждение обновления карточки

cardUpdateModalButton.addEventListener("click", openConfrimUpdateModal);

function openConfrimUpdateModal() {
  switchModal(
    cardUpdateModalWindow,
    confrimUpdateModalWindow,
    openModal,
    closeModal
  );

  showButtonText(
    true,
    false,
    false,
    confrimUpdateModalWindow,
    showButtonTextParams.update
  );
}

confrimUpdateModalButton.addEventListener("click", changeCardName);

function changeCardName() {
  newCardData.name = cardUpdateInputfield.value;
  newCardData.link = currentCardData.link;

  showButtonText(
    false,
    true,
    false,
    confrimUpdateModalWindow,
    showButtonTextParams.update
  );

  Promise.all([
    deleteNewplace(currentCardData.cardId, configAPI),
    addNewplace(newCardData, configAPI),
  ])
    .then(([deleteResult, addedCard]) => {
      deleteCard(currentCardData.cardElement);
      renderCard(addedCard);
      closeModal(confrimUpdateModalWindow);
      clearObjectValues(currentCardData);
      showButtonText(
        false,
        false,
        true,
        confrimUpdateModalWindow,
        showButtonTextParams.update
      );
    })
    .catch((error) => {
      showButtonText(
        false,
        false,
        true,
        confrimUpdateModalWindow,
        showButtonTextParams.error
      );
      console.log(`Ошибка: ${error}`);
    });
}

/* ---------------------------------------------------------------- открытие на фулскрин */
function openFullscreenImage(
  cardItemData,
  cardLikeButtonNode,
  cardLikeCounterNode,
  cardItem
) {
  currentCardData.cardId = cardItemData._id;
  currentCardData.likeButtonNode = cardLikeButtonNode;
  currentCardData.likeCounterNode = cardLikeCounterNode;
  currentCardData.cardElement = cardItem;

  popupImage.src = cardItemData.link;
  popupImage.alt = 'фотография: "' + cardItemData.name + '"';
  popupImageCaption.textContent = cardItemData.name;
  popupImageAutor.textContent = "Автор: " + cardItemData.owner.name;

  Promise.all([getUserData(configAPI), getCardsFromServer(configAPI)])
    .then(([userData, initialCardsArray]) => {
      const matchedCard = initialCardsArray.find(
        (card) => card._id === currentCardData.cardId
      );
      const likes = matchedCard ? matchedCard.likes : [];
      IfAlreadyLiked(
        likes,
        userData._id,
        likeButtonFullscreen,
        likeCounterFullscreen,
        currentCardData.cardElement
      );
      likeCounterFullscreen.textContent = likes.length;
      openModal(popupImageModalWindow);
      cardLikeCounterNode.textContent = likes.length;
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

/* --------------------------------------------------------------------- лайк и состояние кнопки лайка */

function IfAlreadyLiked(likes, userId, likeButton, likesCounter, cardItem) {
  const alreadyLiked = likes.some((like) => like._id === userId);
  if (alreadyLiked) {
    likeButton.classList.add("card__like-button_is-active");
    likesCounter.classList.add("my_like_is-active");
    cardItem.classList.add("liked_shadow");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
    likesCounter.classList.remove("my_like_is-active");
    cardItem.classList.remove("liked_shadow");
  }
}

// лайк на фулскрине

likeButtonFullscreen.addEventListener("click", () => {
  handleLikeCard(
    currentCardData.cardId,
    currentCardData.likeButtonNode,
    currentCardData.likeCounterNode,
    currentCardData.cardElement
  );
});

// like handler

function handleLikeCard(
  cardId,
  cardLikeButton,
  cardLikesCounter,
  cardContainer
) {
  const isLiked = cardLikeButton.classList.contains(
    "card__like-button_is-active"
  );
  toggleLike(cardId, isLiked, configAPI)
    .then((likedCardData) => {
      likeCard(cardLikeButton);
      likeCard(likeButtonFullscreen);
      changeLikesCounter(cardLikesCounter, likedCardData);
      changeLikesCounter(likeCounterFullscreen, likedCardData);
      cardContainer.classList.toggle("liked_shadow");
    })

    .catch((error) => console.log(`Ошибка: ${error}`));
}

/* -------------------------------------------------------- слушатель кнопки подтверждения удаления + handle Delete Card -- */

confirmDeleteButton.addEventListener("click", handleDeleteCard);

function handleDeleteCard() {
  showButtonText(
    false,
    true,
    false,
    confirmDeleteModalWindow,
    showButtonTextParams.delete
  );
  deleteNewplace(currentCardData.cardId, configAPI)
    .then(() => {
      deleteCard(currentCardData.cardElement);
      closeModal(confirmDeleteModalWindow);
      clearObjectValues(currentCardData);
      showButtonText(
        false,
        false,
        true,
        confirmDeleteModalWindow,
        showButtonTextParams.delete
      );
    })
    .catch((error) => {
      showButtonText(
        false,
        false,
        true,
        confirmDeleteModalWindow,
        showButtonTextParams.error
      );
      console.log(`Ошибка: ${error}`);
    });
}

/* --------------------------------------------------------------------------------------------------------------------- */
enableValidation(configValidation);
//
//
//

/* ==================================================================================================================== */
/* ==================================================================================================================== */

//  test images

//  https://cdn.culture.ru/images/eb564802-73d5-5013-a8c3-2b9ca85a2d8f
//  https://avatars.mds.yandex.net/i?id=37aafcd53e9cf8ef041cff42bae62e44_l-5341511-images-thumbs&n=13
//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
//  https://img.goodfon.ru/original/1600x900/9/ca/fable-dzhek-iz-teni-maska.jpg
