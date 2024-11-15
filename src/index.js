import "./index.css";

import { initialCardsArray } from "./scripts/cards";
import { renderCards } from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";

/* ------------------------------------------------------- */

renderCards(initialCardsArray);

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

const cardImageContainer = document.querySelector(".places__list");
const cardImageModalWindow = document.querySelector(".popup_type_image");

/* ----------- обработка модальных окон ------------------ */

profileEditButton.addEventListener("click", () => {
  profileInputfieldName.value = profileName.textContent;
  profileInputfieldJob.value = profileJob.textContent;
  openModal(profileModalWindow);
});
/* ----------------------  */
newplaceAddButton.addEventListener("click", () => {
  newplaceFormElement.reset();
  openModal(newplaceModalWindow);
});
/* ----------------------  */
cardImageContainer.addEventListener("click", (evt) => {
  const cardImage = evt.target.closest(".card__image");
  if (cardImage) {
    openModal(cardImageModalWindow);
  }
});
/* -------------- обработка формы профиля ----------------- */

profileFormElement.addEventListener("submit", editProfile);

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputfieldName.value;
  profileJob.textContent = profileInputfieldJob.value;
  closeModal(profileModalWindow);
}

/* ----------- обработка формы новой карточки ------------- */

newplaceFormElement.addEventListener("submit", addNewPlace);

function addNewPlace(evt) {
  evt.preventDefault();
  const newсardData = [
    {
      name: newplaceInputfieldName.value,
      link: newplaceInputfieldLink.value,
    },
  ];
  renderCards(newсardData);
  closeModal(newplaceModalWindow);
  newplaceFormElement.reset();
}

//  test image
//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
