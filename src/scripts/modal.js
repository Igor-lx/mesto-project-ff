function openModal(modalWindowElement) {
  modalWindowElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByKey);

  document.addEventListener("click", closeModalByClick);
}

function closeModal(modalWindowElement) {
  modalWindowElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByKey);
  document.removeEventListener("click", closeModalByClick);
}

function closeModalByClick(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeModalByKey(evt) {
  if (evt.key === "Escape") {
    closeModal(evt.currentTarget);
  }
}

/* ----------------------------- */
export { openModal, closeModal };
/* ----------------------------- */
