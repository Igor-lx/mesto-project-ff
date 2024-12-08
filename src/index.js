import "./index.css";

//import { initialCardsArray } from "./scripts/cards";
import {
  createCard,
  deleteCard,
  likeCard,
  processImgDownldError,
} from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import { getUserData, getInitialCards } from "./scripts/api";

/* ------------------------------------------------------- */
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

const cardPlace = document.querySelector(".places__list");

function renderCard(cardItemData) {
  cardPlace.prepend(
    createCard(
      cardItemData,
      deleteCard,
      processImgDownldError,
      likeCard,
      openFullscreenImage
    )
  );
}

//initialCardsArray.reverse().forEach(renderCard);

/* ------------------------------------------------------- */

const profileFormElement = document.querySelector('[name="edit-profile"]');
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalWindow = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileInputfieldName = document.querySelector('[name="person_name"]');
const profileInputfieldJob = document.querySelector(
  '[name="person_description"]'
);

const newplaceFormElement = document.querySelector('[name="new-place"]');
const newplaceAddButton = document.querySelector(".profile__add-button");
const newplaceModalWindow = document.querySelector(".popup_type_new-card");
const newplaceInputfieldName = document.querySelector('[name="newplace_name"]');
const newplaceInputfieldLink = document.querySelector('[name="newplace_url"]');

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageModalWindow = document.querySelector(".popup_type_image");

/* ----------------------------------------------------------------------- обработка модальных окон ------------------ */

/* ------------------------------------------------------- */

profileEditButton.addEventListener("click", openProfileModal);

function openProfileModal() {
  profileInputfieldName.value = profileName.textContent;
  profileInputfieldJob.value = profileJob.textContent;
  openModal(profileModalWindow);
  clearValidation(profileFormElement, configValidation);
}
/* ----------------------  */
newplaceAddButton.addEventListener("click", openNewplaceModal);

function openNewplaceModal() {
  newplaceFormElement.reset();
  openModal(newplaceModalWindow);
  clearValidation(newplaceFormElement, configValidation);
}

/* ----------------------  */
function openFullscreenImage(cardItemData) {
  popupImage.src = cardItemData.link;
  popupImage.alt = 'фотография: "' + cardItemData.name + '"';
  popupImageCaption.textContent = cardItemData.name;
  openModal(popupImageModalWindow);
}
/* -------------- обработка формы профиля ----------------- */

profileFormElement.addEventListener("submit", submitProfile);

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputfieldName.value;
  profileJob.textContent = profileInputfieldJob.value;
  closeModal(profileModalWindow);
}
/* ----------- обработка формы новой карточки ------------- */

newplaceFormElement.addEventListener("submit", submitNewplace);

function submitNewplace(evt) {
  evt.preventDefault();

  const newсardData = {
    name: newplaceInputfieldName.value,
    link: newplaceInputfieldLink.value,
  };

  renderCard(newсardData);
  closeModal(newplaceModalWindow);
  newplaceFormElement.reset();
}

enableValidation(configValidation);

/* ------------------------------------------------------- */

// 4 ПРОМИС АЛЛ

getUserData()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((error) => console.log(error));

getInitialCards()
  .then((initialCards) => {
    initialCards.reverse().forEach((card) => {
      renderCard(card);
    });
  })
  .catch((error) => console.log(error));

//
//
//
//
//
//
//

/* ------------------------------------------------------- */
//  test image
//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
