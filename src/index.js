/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/images_import";
import { initialCardsArray } from "./scripts/card_data";
import { renderCard } from "./scripts/card_create";

import { openAndCloseModal } from "./scripts/modal_handler";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard();

document.addEventListener("click", function (evt) {
  openAndCloseModal(evt);
});


/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray };
