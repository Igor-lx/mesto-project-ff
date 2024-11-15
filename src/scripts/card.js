function createCard(
  cardsArray,
  deleteCallback,
  errorCallback,
  likeCallback,
  fullscreenCallback
) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);
  /* -------------------------------------------------------- */
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");

  cardItemTitle.textContent = cardsArray.name;
  cardItemImage.src = cardsArray.link;
  cardItemImage.alt = 'фотография: "' + cardsArray.name + '"';
  /* -------------------------------------------------------- */
  const deleteCardButton = cardItem.querySelector(".card__delete-button");
  deleteCardButton.addEventListener("click", function () {
    deleteCallback(cardItem);
  });
  /* -------------------------------------------------------- */
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function (evt) {
    likeCallback(evt.target);
  });
  /* -------------------------------------------------------- */
  cardItemImage.addEventListener("click", function (evt) {
    fullscreenCallback(evt.target);
  });
  /*---------- ++ обработчик ошибки загрузки img ---------- */
  const cardItemDescription = cardItem.querySelector(".card__description");

  cardItemImage.onerror = function () {
    errorCallback(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeButton
    );
  };
  /* -------------------------------------------------------- */

  return cardItem;
}
/* ========================================================================================================= */
/* --------------------------------------- Callback Functions ---------------------------------------------- */

function deleteCard(i) {
  i.remove();
}
/* -------------------------------------------------------- */
function likeCard(i) {
  i.classList.toggle("card__like-button_is-active");
}
/* -------------------------------------------------------- */
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

function openFullscreenImage(i) {
  popupImage.src = i.src;
  popupImage.alt = i.alt;
  popupImageCaption.textContent =
    i.parentElement.querySelector(".card__title").textContent;
}
/* ---- ++ функция выравнивания при ошибке загрузки img ---- */
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
/* ========================================================================================================= */
const cardPlace = document.querySelector(".places__list");

function renderCard(cardsData) {
  cardsData.reverse().forEach(function (i) {
    cardPlace.prepend(
      createCard(
        i,
        deleteCard,
        processImgDownldError,
        likeCard,
        openFullscreenImage
      )
    );
  });
}

/* ----------------------------- */
export { renderCard };
/* ---------------------------- */
