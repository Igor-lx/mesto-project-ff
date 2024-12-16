//
// import {stopInterval, startInterval} from "../index"

function openModal(modalWindowElement) {
  //  stopInterval();
  modalWindowElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByKey);
  modalWindowElement.addEventListener("mousedown", closeModalByClick);
}

function closeModal(modalWindowElement) {
  //   startInterval()
  modalWindowElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByKey);
  modalWindowElement.removeEventListener("mousedown", closeModalByClick);
}

function closeModalByClick(evt) {
  if (
    evt.target.classList.contains("popup_is-opened") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function closeModalByKey(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

/* --------------------------------------------------------------- */
export { openModal, closeModal };
