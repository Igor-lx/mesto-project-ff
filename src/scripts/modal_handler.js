const editProfileFormElement = document.querySelector('[name="edit-profile"]');
const submitCardFormElement = document.querySelector('[name="new-place"]');

let targetBlock;

function openAndCloseModal(item) {
  const targetBlockClass = item.target.getAttribute("data-target");
  if (targetBlockClass) {
    targetBlock = document.querySelector(`.${targetBlockClass}`);
    if (!targetBlock.classList.contains("popup_is-opened")) {
      openModal();
    } else {
      closeModal();
    }
  } else {
    closeModalByOverlay(item);
  }
}

function openModal() {
  targetBlock.classList.add("popup_is-opened");
  addEscListener();
}

function closeModal() {
  targetBlock.classList.remove("popup_is-opened");
  removeEscListener();
  setTimeout(() => {
    editProfileFormElement.reset();
  }, 600);

  setTimeout(() => {
    submitCardFormElement.reset();
  }, 600);
}

function closeModalByOverlay(i) {
  if (i.target === targetBlock) {
    closeModal();
  }
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function addEscListener() {
  document.addEventListener("keydown", closeModalByEsc);
}

function removeEscListener() {
  document.removeEventListener("keydown", closeModalByEsc);
}

/* ------------------------------------------------- ЭКСПОРТ ---- */
export {
  openAndCloseModal,
  closeModal,
  editProfileFormElement,
  submitCardFormElement,
};
/* -------------------------------------------------------------- */
