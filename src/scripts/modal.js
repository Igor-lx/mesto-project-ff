function openModal(modalWindowElement) {
  modalWindowElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) =>
    closeModalByKey(evt, modalWindowElement)
  );
  document.addEventListener("click", (evt) =>
    closeModalByClick(evt, modalWindowElement)
  );
}

function closeModal(modalWindowElement) {
  modalWindowElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) =>
    closeModalByKey(evt, modalWindowElement)
  );
  document.removeEventListener("click", (evt) =>
    closeModalByClick(evt, modalWindowElement)
  );
}

function closeModalByClick(evt, modalWindowElement) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(modalWindowElement);
  }
}

function closeModalByKey(evt, modalWindowElement) {
  if (evt.key === "Escape") {
    closeModal(modalWindowElement);
  }
}

/* ----------------------------- */
export { openModal, closeModal };
/* ----------------------------- */
