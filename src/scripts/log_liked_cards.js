//
import { getInitialCards } from "./api";

/* ========================================================== */
/* ============================== КЛЮЧ НАСТРОЕК ============= */

export const logLikedSettings = {
  all: false,
  my: true,
  name: "камчатка",
};

/* ========================================================== */
/* ========================================================== */

export function logLikedCards(config, settings) {
  const { all, my, name } = settings;

  getInitialCards(config)
    .then((cards) => {
      let filteredCards = [];

      if (all) {
        filteredCards = cards;
      } else if (my) {
        filteredCards = cards.filter(
          (card) =>
            card.owner.name === "Argon" && card.likes && card.likes.length > 0
        );
      } else if (name) {
        const normalizedCardName = name.trim().toLowerCase();
        filteredCards = cards.filter(
          (card) => card.name.trim().toLowerCase() === normalizedCardName
        );
      }

      if (filteredCards.length > 0) {
        filteredCards.forEach((card) => {
          const cardName = card.name;
          const ownerName = card.owner.name;
          const likersNames = card.likes.map((liker) => liker.name).join(", ");
          console.log(`${cardName} / ${ownerName}: ${likersNames}`);
        });
      } else {
        if (!all && !my && name) {
          console.log(`Карточка с именем "${name}" не найдена.`);
        } else {
          console.log("Подходящих карточек не найдено.");
        }
      }
    })
    .catch((error) => console.error("Ошибка при получении карточек:", error));
}
