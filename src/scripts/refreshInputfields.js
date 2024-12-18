function clearInputFields(formElement, clearValidation, configValidation) {
  const clearFormButton = formElement
    .closest(".popup__content")
    .querySelector(".clear_form");
  clearFormButton.addEventListener("click", () => {
    formElement.reset();
    clearValidation(formElement, configValidation);
  });
}


function refreshInputFields(
  formElement,
  { inputField1, inputField2, valueSource1, valueSource2 },
  clearValidation,
  configValidation
) {
  const clearFormButton = formElement
    .closest(".popup__content")
    .querySelector(".clear_form");
  clearFormButton.addEventListener("click", () => {
    clearValidation(formElement, configValidation);

    if (inputField1 && valueSource1) {
      inputField1.value = valueSource1.textContent;
    }

    if (inputField2 && valueSource2) {
      inputField2.value = valueSource2.textContent;
    }
  });
}