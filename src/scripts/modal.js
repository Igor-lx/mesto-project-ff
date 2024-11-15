function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) => closeModalByKey(evt, element));
  document.addEventListener("click", (evt) => closeModalByClick(evt, element));
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", (evt) =>
    closeModalByKey(evt, element)
  );
  document.removeEventListener("click", (evt) =>
    closeModalByClick(evt, element)
  );
}

function closeModalByClick(evt, element) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(element);
  }
}

function closeModalByKey(evt, element) {
  if (evt.key === "Escape") {
    closeModal(element);
  }
}

export { openModal, closeModal };
