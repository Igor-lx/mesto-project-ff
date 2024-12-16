import { getInitialCards } from "./api";
import { configAPI } from "../index";

export const likersModalDomNodes = {
  modalWindow: document.querySelector(".popup_type_likes"),
  imgName: document.querySelector(".popup_likes_image_name"),
  autor: document.querySelector(".popup_likes_image_autor"),
  title: document.querySelector(".popup__title_likes"),
  namesList: document.querySelector(".likers-names"),
};

export function showLikedUsers(cardId) {
  getInitialCards(configAPI)
    .then((cards) => {
      const card = cards.find((card) => card._id === cardId);

      if (card) {
        likersModalDomNodes.imgName.textContent = `${card.name}`;
        likersModalDomNodes.autor.textContent = `Автор: ${card.owner.name}`;
        likersModalDomNodes.imgName.classList.remove("popup__content_no_likes");

        if (card.likes.length > 0) {
          const likersNames = card.likes.map((liker) => liker.name).join(", ");

          likersModalDomNodes.title.textContent = "Это фото понравилось:";
          likersModalDomNodes.namesList.textContent = likersNames;
        } else {
          likersModalDomNodes.imgName.textContent =
            "У этой карточки нет лайков";
          likersModalDomNodes.imgName.classList.add("popup__content_no_likes");
          likersModalDomNodes.autor.textContent = "";
        }
      } else {
        likersModalDomNodes.imgName.textContent = "Карточка не найдена";
      }
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}
