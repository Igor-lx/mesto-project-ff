function createCard(cardItemData, userId, callbackFunctionsSet) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);

  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");

  cardItemTitle.textContent = cardItemData.name;
  cardItemImage.src = cardItemData.link;
  cardItemImage.alt = 'фотография: "' + cardItemData.name + '"';

  // Кнопка удаления карточки
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  if (
    callbackFunctionsSet.showDeleteButton(
      cardItemData,
      userId,
      cardDeleteButton
    )
  ) {
    cardDeleteButton.addEventListener("click", () => {
      callbackFunctionsSet.deleteCard(cardItemData._id, cardItem);
    });
  }

  // Кнопка лайка
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const cardLikeCounter = cardItem.querySelector(".likes_counter");
  cardLikeCounter.textContent = cardItemData.likes.length;

  cardLikeButton.addEventListener("click", (evt) => {
    callbackFunctionsSet.likeCard(evt.target);
  });

  // Открытие изображения в полноэкранном режиме
  cardItemImage.addEventListener("click", () => {
    if (cardItemImage.classList.contains("card__image__load_failure")) {
      return;
    }
    callbackFunctionsSet.openFullscreenImage(cardItemData);
  });

  // Обработчик ошибки при загрузке изображения
  const cardItemDescription = cardItem.querySelector(".card__description");
  cardItemImage.onerror = () => {
    callbackFunctionsSet.processImgDownldError(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeButton
    );
  };

  return cardItem;
}

export { createCard };
