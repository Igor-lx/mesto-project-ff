import "./index.css";

import { initialCardsArray } from "./scripts/cards";
import {
  createCard,
  deleteCard,
  likeCard,
  processImgDownldError,
} from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";

/* ------------------------------------------------------- */

const cardPlace = document.querySelector(".places__list");

function renderCard(cardsData) {
  cardPlace.prepend(
    createCard(
      cardsData,
      deleteCard,
      processImgDownldError,
      likeCard,
      openFullscreenImage
    )
  );
}

initialCardsArray.reverse().forEach(renderCard);

/* ------------------------------------------------------- */

const profileFormElement = document.querySelector('[name="edit-profile"]');
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalWindow = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileInputfieldName = document.querySelector('[name="person_name"]');
const profileInputfieldJob = document.querySelector('[name="description"]');

const newplaceFormElement = document.querySelector('[name="new-place"]');
const newplaceAddButton = document.querySelector(".profile__add-button");
const newplaceModalWindow = document.querySelector(".popup_type_new-card");
const newplaceInputfieldName = document.querySelector('[name="place-name"]');
const newplaceInputfieldLink = document.querySelector('[name="link"]');

const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageModalWindow = document.querySelector(".popup_type_image");

/* ----------- обработка модальных окон ------------------ */
profileEditButton.addEventListener("click", openProfileModal);

function openProfileModal() {
  profileInputfieldName.value = profileName.textContent;
  profileInputfieldJob.value = profileJob.textContent;
  openModal(profileModalWindow);
}
/* ----------------------  */
newplaceAddButton.addEventListener("click", openNewPlaceModal);

function openNewPlaceModal() {
  newplaceFormElement.reset();
  openModal(newplaceModalWindow);
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

newplaceFormElement.addEventListener("submit", submitNewPlace);

function submitNewPlace(evt) {
  evt.preventDefault();

  const newсardData = {
    name: newplaceInputfieldName.value,
    link: newplaceInputfieldLink.value,
  };

  renderCard(newсardData);
  closeModal(newplaceModalWindow);
  newplaceFormElement.reset();
}

//  test image
//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
