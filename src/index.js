/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/images_import";
import { initialCardsArray } from "./scripts/card_data";
import { renderCard } from "./scripts/card_create_initial";
import { openModal, closeModal } from "./scripts/modal_handler";

//import { createCustomCard } from "./scripts/card_create_custom";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard(initialCardsArray);

/* открытие модалок */

const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalWindow = document.querySelector(".popup_type_edit");

const newcardAddButton = document.querySelector(".profile__add-button");
const newcardModalWindow = document.querySelector(".popup_type_new-card");

const cardImage = document.querySelectorAll(".card__image");
const cardImageModalWindow = document.querySelector(".popup_type_image");

profileEditButton.addEventListener("click", () => {
  nameInputField.value = profileName.textContent;
  jobInputField.value = profileJob.textContent;
  openModal(profileModalWindow);
});

newcardAddButton.addEventListener("click", () => openModal(newcardModalWindow));

cardImage.forEach((item) => {
  item.addEventListener("click", () => openModal(cardImageModalWindow));
});

/* редактирование профиля */

const ProfileFormElement = document.querySelector('[name="edit-profile"]');

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const nameInputField = document.querySelector('[name="person_name"]');
const jobInputField = document.querySelector('[name="description"]');

ProfileFormElement.addEventListener("submit", (evt) => {
  editProfile(evt);
  closeModal(profileModalWindow);
});

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputField.value;
  profileJob.textContent = jobInputField.value;
}

/*
const submitCardFormElement = document.querySelector('[name="new-place"]');
submitCardFormElement.addEventListener("submit", function (evt) {
  const newCardData = createCustomCard(evt);
  renderCard(newCardData);
  closeModal();
});
*/

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray, renderCard };

//
//
//
//
//
//
// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
