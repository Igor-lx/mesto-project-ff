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

import { handleFormSubmit } from "./scripts/profile_management";
import { handleCardSubmit } from "./scripts/card_create_custom";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard(initialCardsArray);

document.addEventListener("click", function (evt) {
  openAndCloseModal(evt);
});

editProfileFormElement.addEventListener("submit", handleFormSubmit);
submitCardFormElement.addEventListener("submit", handleCardSubmit);

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray, closeModal, renderCard };
//
//
//
//
//

/* ----------------------------------------------------------------------------------------- */
/* -------------------------------    TEST MODULE CODE    ---------------------------------- */
/* ----------------------------------------------------------------------------------------- */

//  TEST CUSTOM IMAGE LINK
// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
