//

export function refreshPage(
  getUserData,
  getCards,
  configApi,
  userId,
  deleteCard,
  renderCard
) {
  const allCardNodes = document.querySelectorAll(".places__item");

  Promise.all([getUserData(configApi), getCards(configApi)])
    .then(([userData, initialCardsArray]) => {
      allCardNodes.forEach((card) => {
        deleteCard(card);
      });
      userId = userData._id;

      initialCardsArray.reverse().forEach((cardItemData) => {
        renderCard(cardItemData);
      });
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}

/*
let intervalId;

export function startInterval() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      refreshPage();
    }, 3000);
  }
}

export function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
//startInterval()
*/
