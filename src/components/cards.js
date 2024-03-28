import { deleteServerCard, likeCard, deleteLike } from "./api.js";
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export function createCard(
  item,
  funcDelete,
  cloneItem,
  openCardPop,
  likeCard,
  id
) {
  const placesItem = cloneItem.querySelector(".places__item").cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  const likeCounter = placesItem.querySelector(".card__like-counter");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  placesItem.id = item._id;
  const cardTitle = placesItem.querySelector(".card__title");
  cardTitle.textContent = item.name;
  const deleteButton = placesItem.querySelector(".card__delete-button");

  const likeButton = placesItem.querySelector(".card__like-button");
  cardImage.addEventListener("click", (evt) => {
    openCardPop(evt);
  });
  likeButton.addEventListener("click", (evt) => {
    likeCard(evt);
  });
  if (id !== item.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (evt) => {
      deleteServerCard(placesItem.id);
      funcDelete(evt);
    });
  }
  if (item.hasOwnProperty("likes")) {
    likeCounter.textContent = item.likes.length;
    if (
      item.likes.some((like) => {
        return like._id === id;
      })
    ) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      console.log(item.likes._id);
    }
  } else {
    likeCounter.textContent = 0;
  }
  return placesItem;
}

export const deleteCard = (event) => {
  event.target.closest(".places__item").remove();
};

export const likeFunc = (event) => {
  const place = event.target.closest(".places__item");
  const counter = place.querySelector(".card__like-counter");
  if (
    !event.target
      .closest(".card__like-button")
      .classList.contains("card__like-button_is-active")
  ) {
    likeCard(place.id)
      .then((res) => {
        event.target
          .closest(".card__like-button")
          .classList.toggle("card__like-button_is-active");
        counter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(place.id)
      .then((res) => {
        event.target
          .closest(".card__like-button")
          .classList.toggle("card__like-button_is-active");
        counter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
