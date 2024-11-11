/* -------------------------------------------------------------------- ИМПОРТ ---- */
import "./index.css";

import { importedImages } from "./scripts/importImages";
import { initialCards as initialCardsArray } from "./scripts/cardData";
import {
  createCard,
  deleteCard,
  processImgDownldError,
} from "./scripts/createCard";

/* ------------------------------------------------------ ГЛОБАЛЬНЫЕ КОНСТАНТЫ ---- */

const cardPlace = document.querySelector(".places__list");

/* ------------------------------------------------------------ ИСПОЛНЯЕМЫЙ JS ---- */

initialCardsArray.forEach(function (i) {
  cardPlace.append(createCard(i, deleteCard, processImgDownldError));
});

/* ------------------------------------------------------------------- ЭКСПОРТ ---- */
export { importedImages };
