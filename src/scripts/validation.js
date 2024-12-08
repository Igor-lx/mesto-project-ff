/* CONFIG TEMPLATE

const validationConfig = {
  formSelector: ".",
  inputfieldSelector: ".",
  submitButtonSelector: ".",
  inactiveButtonClass: "",
  inputfieldErrorStyleClass: "",
  textmessageErrorStyleClass: "",
  errorClassPostfix: "-error",
};

*/
// показ ошибок
function showInputError(formElement, inputField, errorMessage, config) {
  const errorSpanElement = formElement.querySelector(
    `#${inputField.id}${config.errorClassPostfix}`
  );

  inputField.classList.add(config.inputfieldErrorStyleClass);
  errorSpanElement.classList.add(config.textmessageErrorStyleClass);
  errorSpanElement.textContent = errorMessage;
}

// скрытие ошибок
function hideInputError(formElement, inputField, config) {
  const errorSpanElement = formElement.querySelector(
    `#${inputField.id}${config.errorClassPostfix}`
  );

  inputField.classList.remove(config.inputfieldErrorStyleClass);
  errorSpanElement.classList.remove(config.textmessageErrorStyleClass);
  errorSpanElement.textContent = "";
}

// Проверка валидности
function checkValidity(formElement, inputField, config) {
  if (inputField.validity.patternMismatch) {
    showInputError(
      formElement,
      inputField,
      inputField.dataset.errorMessage,
      config
    );
    return;
  }

  if (!inputField.validity.valid) {
    showInputError(
      formElement,
      inputField,
      inputField.validationMessage,
      config
    );
    return;
  }
  hideInputError(formElement, inputField, config);
}

// Переключение состояния кнопки
function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some(
    (inputField) => !inputField.validity.valid
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Слушатели событий
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputfieldSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputField) => {
    inputField.addEventListener("input", () => {
      checkValidity(formElement, inputField, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  formElement.addEventListener("reset", () => {
    clearValidation(formElement, config);
  });
}

// Очистка валидации
function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputfieldSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputField) =>
    hideInputError(formElement, inputField, config)
  );
  toggleButtonState(inputList, submitButton, config);
}

// Включение валидации
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, config);
  });
}

export { enableValidation, clearValidation };
