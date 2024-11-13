/* ---------------------------------------------------- ИМПОРТ---- */
import { closeModal, renderCard } from "../index";

/* --------------------------------------------------------------- */

const newPlaceNameInputField = document.querySelector('[name="place-name"]');
const linkToCustomImageInputField = document.querySelector('[name="link"]');

function handleCardSubmit(evt) {
  evt.preventDefault();

  renderCard({
    name: newPlaceNameInputField.value,
    link: linkToCustomImageInputField.value,
  });

  closeModal();
}

/* ------------------------------------------------- ЭКСПОРТ ---- */
export { handleCardSubmit };
/* -------------------------------------------------------------- */
