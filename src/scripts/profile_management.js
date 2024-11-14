/* ---------------------------------------------------- ИМПОРТ---- */
import { closeModal } from "../index";
/* --------------------------------------------------------------- */

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInputField = document.querySelector('[name="person_name"]');
const jobInputField = document.querySelector('[name="description"]');

nameInputField.placeholder = `${profileTitle.textContent}   / Имя`;
jobInputField.placeholder = `${profileDescription.textContent}   / Род занятий`;

function editProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInputField.value;
  profileDescription.textContent = jobInputField.value;

  nameInputField.placeholder = `${profileTitle.textContent}   / Имя`;
  jobInputField.placeholder = `${profileDescription.textContent}   / Род занятий`;

  closeModal();
}

/* ------------------------------------------------- ЭКСПОРТ ---- */
export { editProfile };
/* -------------------------------------------------------------- */
