

/* --------------------------------------------------------------- */

const newplaceNameInputField = document.querySelector('[name="place-name"]');
const newplaceImageInputField = document.querySelector('[name="link"]');

function createCustomCard(evt) {
  evt.preventDefault();

  return [
    {
      name: newplaceNameInputField.value,
      link: newplaceImageInputField.value,
    },
  ];



 
}

/* ------------------------------------------------- ЭКСПОРТ ---- */
export { createCustomCard };
/* -------------------------------------------------------------- */
