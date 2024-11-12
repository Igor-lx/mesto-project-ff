let targetBlock;

function openAndCloseModal(item) {
  const targetBlockClass = item.target.getAttribute("data-target");
  if (targetBlockClass) {
    targetBlock = document.querySelector(`.${targetBlockClass}`);
    targetBlock.classList.toggle("popup_is-opened");
    if (targetBlock.classList.contains("popup_is-opened")) {
      addEscListener();
    } else {
      removeEscListener();
    }
  } else {
    closeModalByOverlay(item);
  }
}

function closeModalByOverlay(i) {
  if (i.target === targetBlock) {
    closeModalHandler();
  }
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    closeModalHandler();
  }
}

function addEscListener() {
  document.addEventListener("keydown", closeModalByEsc);
}

function removeEscListener() {
  document.removeEventListener("keydown", closeModalByEsc);
}

function closeModalHandler() {
  targetBlock.classList.remove("popup_is-opened");
  removeEscListener();
}

/* ------------------------------------------------- ЭКСПОРТ ---- */
export { openAndCloseModal };
/* -------------------------------------------------------------- */
