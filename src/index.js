/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/images_import";
import { initialCardsArray } from "./scripts/card_data";
import { renderCard } from "./scripts/card_create_initial";

import {
  openAndCloseModal,
  closeModal,
  editProfileFormElement,
  submitCardFormElement,
} from "./scripts/modal_handler";

import { editProfile } from "./scripts/profile_management";
import { createCustomCard } from "./scripts/card_create_custom";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard(initialCardsArray);

document.addEventListener("click", function (evt) {
  openAndCloseModal(evt);
});

editProfileFormElement.addEventListener("submit", editProfile);

submitCardFormElement.addEventListener("submit", function (evt) {
  const newCardData = createCustomCard(evt);
  renderCard(newCardData);
  closeModal();
});

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray, closeModal, renderCard };

//
//
//
//
//
//
// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
