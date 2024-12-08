import { deleteNewplace } from "./api";

const configAPI = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "4539d8f5-d367-42ca-b41c-d2390bc8734d",
    "Content-Type": "application/json",
  },
  userEndpoint: "/users/me",
  cardsEndpoint: "/cards",
  likesEndpoint: "/cards/likes/",
};

function createCard(
  cardItemData,
  userId,
  deleteCallback,
  errorCallback,
  likeCallback,
  fullscreenCallback,
  showDeleteButtonCallback
) {
  const nodeTemplate = document.querySelector("#card-template").content;
  const cardItem = nodeTemplate.querySelector(".card").cloneNode(true);
  /* ------------------------------------------------------ */
  const cardItemTitle = cardItem.querySelector(".card__title");
  const cardItemImage = cardItem.querySelector(".card__image");

  cardItemTitle.textContent = cardItemData.name;
  cardItemImage.src = cardItemData.link;
  cardItemImage.alt = 'фотография: "' + cardItemData.name + '"';
  /* ------------------------------------------------------ */

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  if (showDeleteButtonCallback(cardItemData, userId, cardDeleteButton)) {
    cardDeleteButton.addEventListener("click", () => {
      deleteCallback(cardItemData._id, cardItem);
    });
  }
  /* ------------------------------------------------------ */
  const cardLikeButton = cardItem.querySelector(".card__like-button");

  const cardLikeCounter = cardItem.querySelector(".likes_counter");
  cardLikeCounter.textContent = cardItemData.likes.length;

  cardLikeButton.addEventListener("click", (evt) => {
    likeCallback(evt.target);
  });
  /* ------------------------------------------------------ */
  cardItemImage.addEventListener("click", () => {
    if (cardItemImage.classList.contains("card__image__load_failure")) {
      return;
    }
    fullscreenCallback(cardItemData);
  });
  /*---------- ++ обработчик ошибки загрузки img ---------- */
  const cardItemDescription = cardItem.querySelector(".card__description");

  cardItemImage.onerror = () => {
    errorCallback(
      cardItemImage,
      cardItemTitle,
      cardItemDescription,
      cardLikeButton
    );
  };
  /* ------------------------------------------------------ */

  return cardItem;
}

/* --------------------------------------- Callback Functions ---------------------------------------------- */

function deleteCard(cardId, cardElement) {
  deleteNewplace(cardId, configAPI)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

function showDeleteButton(cardItemData, userId, deleteButton) {
  if (cardItemData.owner._id !== userId) {
    deleteButton.remove();
    return false;
  }
  return true;
}

/* --------------------------------------------------------- */
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
/* ---- ++ функция выравнивания при ошибке загрузки img ---- */
function processImgDownldError(
  cardItemImage,
  cardItemTitle,
  cardItemDescription,
  cardLikeButton
) {
  cardItemImage.classList.add(
    "card__image__load_failure__textstile",
    "card__image__load_failure"
  );
  cardItemTitle.classList.add("card__image__load_failure__textstile");
  cardItemTitle.textContent =
    "Упс! Изображение не найдено, но мы уже отправили за ним поисковую команду.";
  cardItemDescription.classList.add("card__image__load_failure__description");
  cardLikeButton.style.display = "none";
  cardItemImage.style.cursor = "not-allowed";
}

/* ----------------------------- */
export {
  createCard,
  deleteCard,
  likeCard,
  processImgDownldError,
  showDeleteButton,
};
/* ---------------------------- */
