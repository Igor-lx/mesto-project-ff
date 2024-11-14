/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/images_import";
import { initialCardsArray } from "./scripts/card_data";
import { renderCard } from "./scripts/card_create_initial";
import { openModal, closeModal } from "./scripts/modal_handler";

//import { editProfile } from "./scripts/profile_management";
//import { createCustomCard } from "./scripts/card_create_custom";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard(initialCardsArray);

const modals = [
  {
    button: document.querySelector(".profile__edit-button"),
    window: document.querySelector(".popup_type_edit"),
  },
  {
    button: document.querySelector(".profile__add-button"),
    window: document.querySelector(".popup_type_new-card"),
  },
];

const cardImages = document.querySelectorAll(".card__image");
const ImageModalWindow = document.querySelector(".popup_type_image");

modals.forEach((item) => {
  item.button.addEventListener("click", () => openModal(item.window));
});

cardImages.forEach((item) => {
  item.addEventListener("click", () => openModal(ImageModalWindow));
});

/*
const editProfileFormElement = document.querySelector('[name="edit-profile"]');
const submitCardFormElement = document.querySelector('[name="new-place"]');

editProfileFormElement.addEventListener("submit", editProfile);

submitCardFormElement.addEventListener("submit", function (evt) {
  const newCardData = createCustomCard(evt);
  renderCard(newCardData);
  closeModal();
});
*/

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray, renderCard, closeModal };

//
//
//
//
//
//
// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
