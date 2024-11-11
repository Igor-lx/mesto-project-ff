export {createCard, deleteCard, processImgDownldError}; 

/* ------------------------------------------------------------------------------------------------------------------ */

function createCard(paramArray, paramFunction, errorCallback) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);

  const cardItemImage = cardItem.querySelector(".card__image");
  const cardItemTitle = cardItem.querySelector(".card__title");
  const deleteCardButton = cardItem.querySelector(".card__delete-button");

  cardItemImage.src = paramArray.link;
  // cardItemImage.setAttribute("src", paramArray.link);  // а можно вот так
  cardItemImage.alt = 'фотография: "' + paramArray.name + '"';
  cardItemTitle.textContent = paramArray.name;

  deleteCardButton.addEventListener("click", function () {
    paramFunction(cardItem);
  });

  /* -------------------------------------------------------------------- + выравнивание при ошибке загрузки img---- */
  const cardItemDescription = cardItem.querySelector(".card__description");
  const cardLikeButton = cardItem.querySelector(".card__like-button");

  cardItemImage.onerror = () => {
    errorCallback(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeButton
    );
  };
  /* --------------------------------------------------------------------------------------------------------------- */

  return cardItem;
}

function deleteCard(i) {
  i.remove();
}

/* ----------------------------------------------------------------------------------------------------------------- */
function processImgDownldError(Image, Title, Description, Button) {
  Image.classList.add(
    "card__image__load_failure__textstile",
    "card__image__load_failure"
  );
  Title.classList.add("card__image__load_failure__textstile");
  Title.textContent =
    "Упс! Изображение не найдено, но мы уже отправили за ним поисковую команду.";
  Description.classList.add("card__image__load_failure__description");
  Button.style.display = "none";
}
/* ---------------------------------------------------------------------------------------------------------------- */



