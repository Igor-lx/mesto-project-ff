//

export const likersModalNodes = {
  modalWindow: document.querySelector(".popup_type_likes"),
  imgName: document.querySelector(".popup_likes_image_name"),
  imgAutor: document.querySelector(".popup_likes_image_autor"),
  text: document.querySelector(".popup__title_likes"),
  likersNames: document.querySelector(".likers-names"),
};

/* -------------------------------------------------------------------------------------------------*/

export function showLikedUsers(cardId, getCards, configApi) {
  getCards(configApi)
    .then((cards) => {
      const card = cards.find((card) => card._id === cardId);

      if (card) {
        likersModalNodes.imgName.textContent = `${card.name}`;
        likersModalNodes.imgAutor.textContent = `Автор: ${card.owner.name}`;
        likersModalNodes.imgName.classList.remove("popup__content_no_likes");

        if (card.likes.length > 0) {
          const likersNames = card.likes.map((liker) => liker.name).join(", ");

          likersModalNodes.text.textContent = "Это фото понравилось:";
          likersModalNodes.likersNames.textContent = likersNames;
        } else {
          likersModalNodes.imgName.textContent = "У этой карточки нет лайков";
          likersModalNodes.imgName.classList.add("popup__content_no_likes");
          likersModalNodes.imgAutor.textContent = "";
        }
      } else {
        likersModalNodes.imgName.textContent = "Карточка не найдена";
      }
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}
