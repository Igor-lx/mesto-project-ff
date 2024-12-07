/*
const validationConfig = {
  formSelector: ".", 
  inputSelector: ".", 
  submitButtonSelector: ".", 
  inactiveButtonClass: "", 
  inputErrorClass: "", 
  errorClass: "", 
  errorClassPostfix: "-error", 
};
*/


// Функция вывода ошибок
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validateConfig
) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}${validateConfig.errorClassPostfix}`
  );
  if (!errorElement) return; // Проверка на существование errorElement

  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateConfig.errorClass);
}

// Функция скрытия ошибок
function hideInputError(formElement, inputElement, validateConfig) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}${validateConfig.errorClassPostfix}`
  );
  if (!errorElement) return; // Проверка на существование errorElement

  inputElement.classList.remove(validateConfig.inputErrorClass);
  errorElement.classList.remove(validateConfig.errorClass);
  errorElement.textContent = "";
}

// Проверка валидности инпута
function isValid(formElement, inputElement, validateConfig) {
  if (inputElement.validity.valueMissing) {
    showInputError(
      formElement,
      inputElement,
      "Поле не может быть пустым.",
      validateConfig
    );
    return false;
  }

  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage,
      validateConfig
    );
    return false;
  }

  hideInputError(formElement, inputElement, validateConfig);
  return true;
}

// Переключение состояния кнопки
function toggleButtonState(inputList, buttonElement, validateConfig) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasInvalidInput) {
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validateConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Слушатели событий
function setEventListeners(formElement, validateConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validateConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validateConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validateConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validateConfig);
      toggleButtonState(inputList, buttonElement, validateConfig);
    });
  });

  formElement.addEventListener("reset", () => {
    clearValidation(formElement, validateConfig);
  });
}

// Очистка валидации
function clearValidation(formElement, validateConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validateConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validateConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validateConfig)
  );
  toggleButtonState(inputList, submitButton, validateConfig);
}

// Включение валидации
function enableValidation(validateConfig) {
  const forms = Array.from(
    document.querySelectorAll(validateConfig.formSelector)
  );

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, validateConfig);
  });
}

export { enableValidation, clearValidation };
