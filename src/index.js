/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/importImages";
import { initialCardsArray } from "./scripts/cardData";
import { renderCard } from "./scripts/createCard";

import { openAndCloseModal } from "./scripts/modal";

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

renderCard();

document.addEventListener("click", function (evt) {
  openAndCloseModal(evt);
});

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages, initialCardsArray };
