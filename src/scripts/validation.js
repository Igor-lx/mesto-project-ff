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
// Функция вывода ошибок
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorSpanElement = formElement.querySelector(
    `.${inputElement.id}${validationConfig.errorClassPostfix}`
  );
  if (!errorSpanElement) return; // Проверка на существование errorSpanElement

  inputElement.classList.add(validationConfig.inputfieldErrorStyleClass); // Применение красного бордера
  errorSpanElement.textContent = errorMessage;
  errorSpanElement.classList.add(validationConfig.textmessageErrorStyleClass); // Применение видимости ошибки
}

// Функция скрытия ошибок
function hideInputError(formElement, inputElement, validationConfig) {
  const errorSpanElement = formElement.querySelector(
    `.${inputElement.id}${validationConfig.errorClassPostfix}`
  );
  if (!errorSpanElement) return; // Проверка на существование errorSpanElement

  inputElement.classList.remove(validationConfig.inputfieldErrorStyleClass);
  errorSpanElement.classList.remove(validationConfig.textmessageErrorStyleClass);
  errorSpanElement.textContent = "";
}

// Проверка валидности инпута
function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.valueMissing) {
    showInputError(
      formElement,
      inputElement,
      "Поле не может быть пустым.",
      validationConfig
    );
    return false;
  }

  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage,
      validationConfig
    );
    return false;
  }

  hideInputError(formElement, inputElement, validationConfig);
  return true;
}

// Переключение состояния кнопки
function toggleButtonState(inputList, buttonElement, validationConfig) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Слушатели событий
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputfieldSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });

  formElement.addEventListener("reset", () => {
    clearValidation(formElement, validationConfig);
  });
}

// Очистка валидации
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputfieldSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validationConfig)
  );
  toggleButtonState(inputList, submitButton, validationConfig);
}

// Включение валидации
function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, validationConfig);
  });
}

export { enableValidation, clearValidation };
