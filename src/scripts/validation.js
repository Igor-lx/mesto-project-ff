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

function showInputError(formElement, inputField, errorMessage, config) {
  const errorSpanElement = formElement.querySelector(
    `#${inputField.id}${config.errorClassPostfix}`
  );

  inputField.classList.add(config.inputfieldErrorStyleClass);
  errorSpanElement.classList.add(config.textmessageErrorStyleClass);
  errorSpanElement.textContent = errorMessage;
}

function hideInputError(formElement, inputField, config) {
  const errorSpanElement = formElement.querySelector(
    `#${inputField.id}${config.errorClassPostfix}`
  );

  inputField.classList.remove(config.inputfieldErrorStyleClass);
  errorSpanElement.classList.remove(config.textmessageErrorStyleClass);
  errorSpanElement.textContent = "";
}

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

function toggleSubmitButton(inputList, buttonElement, config) {
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

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());

    const inputList = Array.from(
      formElement.querySelectorAll(config.inputfieldSelector)
    );
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    toggleSubmitButton(inputList, submitButton, config);

    inputList.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        checkValidity(formElement, inputField, config);
        toggleSubmitButton(inputList, submitButton, config);
      });
    });
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputfieldSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputField) =>
    hideInputError(formElement, inputField, config)
  );
  toggleSubmitButton(inputList, submitButton, config);
}

export { enableValidation, clearValidation };
