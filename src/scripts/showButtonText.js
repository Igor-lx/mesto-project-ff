export const showButtonTextParams = {
  save: {
    loadingText: "Сохранение...",
    completedText: "Сохранено",
  },
  delete: {
    loadingText: "Удаление...",
    completedText: "Удалено",
  },
  update: {
    loadingText: "Обновление...",
    completedText: "Обновлено",
  },
  error: {
    completedText: "Ошибка",
  },
};

export function showButtonText(
  ifOpened,
  ifLoading,
  ifCompleted,
  formElement,
  buttonText
) {
  const submitButton = formElement.querySelector(".popup__button");

  if (!submitButton.dataset.originalText) {
    submitButton.dataset.originalText = submitButton.textContent;
  }

  if (ifOpened) {
    submitButton.textContent = submitButton.dataset.originalText;
  } else if (ifLoading) {
    submitButton.textContent = buttonText.loadingText;
  } else if (ifCompleted) {
    submitButton.textContent = buttonText.completedText;
  }
}
