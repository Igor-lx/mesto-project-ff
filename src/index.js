import "./index.css";

import { initialCardsArray } from "./scripts/cards";
import { renderCard } from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";

/* ------------------------------------------------------- */

renderCard(initialCardsArray);

/* ----------- обработка модальных окон ------------------ */

const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalWindow = document.querySelector(".popup_type_edit");

const newcardAddButton = document.querySelector(".profile__add-button");
const newcardModalWindow = document.querySelector(".popup_type_new-card");

const cardImageContainer = document.querySelector(".places__list");
const cardImageModalWindow = document.querySelector(".popup_type_image");
/* ----------------------------- */
profileEditButton.addEventListener("click", () => {
  InputFieldName.value = profileName.textContent;
  InputFieldJob.value = profileJob.textContent;
  openModal(profileModalWindow);
});
/* ----------------------------- */
newcardAddButton.addEventListener("click", () => openModal(newcardModalWindow));

cardImageContainer.addEventListener("click", (evt) => {
  const cardImage = evt.target.closest(".card__image");
  if (cardImage) {
    openModal(cardImageModalWindow);
  }
});
/* ----------- обработка формы профиля ------------------ */

const ProfileFormElement = document.querySelector('[name="edit-profile"]');

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const InputFieldName = document.querySelector('[name="person_name"]');
const InputFieldJob = document.querySelector('[name="description"]');
/* ----------------------------- */
ProfileFormElement.addEventListener("submit", (evt) => {
  editProfile(evt);
  closeModal(profileModalWindow);
});

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = InputFieldName.value;
  profileJob.textContent = InputFieldJob.value;
}
/* ----------- обработка формы новой карточки ------------------ */

const cardFormElement = document.querySelector('[name="new-place"]');
const newplaceNameInputField = document.querySelector('[name="place-name"]');
const newplaceImageInputField = document.querySelector('[name="link"]');
/* ----------------------------- */
cardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCardData = [
    {
      name: newplaceNameInputField.value,
      link: newplaceImageInputField.value,
    },
  ];
  renderCard(newCardData);
  closeModal(newcardModalWindow);
  cardFormElement.reset();
});

//  test image
//  https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
