/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/images_import";
import { initialCardsArray } from "./scripts/card_data";
import { renderCard } from "./scripts/card_create";

import {
  openAndCloseModal,
  closeModal,
  editProfileFormElement,
} from "./scripts/modal_handler";

import { handleFormSubmit } from "./scripts/profile_management";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard();

document.addEventListener("click", function (evt) {
  openAndCloseModal(evt);
});

editProfileFormElement.addEventListener("submit", handleFormSubmit);

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray, closeModal };
//
//
//
//
//

/* ----------------------------------------------------------------------------------------- */
/* -------------------------------    TEST MODULE CODE    ---------------------------------- */
/* ----------------------------------------------------------------------------------------- */
