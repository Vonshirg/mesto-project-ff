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

export function createCard(item, funcDelete, cloneItem, openCardPop, likeCard) {
  const placesItem = cloneItem.querySelector(".places__item").cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardTitle = placesItem.querySelector(".card__title");
  cardTitle.textContent = item.name;
  const deleteButton = placesItem.querySelector(".card__delete-button");
  const likeButton = placesItem.querySelector(".card__like-button");
  deleteButton.addEventListener("click", (evt) => {
    funcDelete(evt);
  });
  cardImage.addEventListener("click", (evt) => {
    openCardPop(evt);
  });
  likeButton.addEventListener("click", (evt) => {
    likeCard(evt);
  });
  return placesItem;
}

export const deleteCard = (event) => {
  event.target.closest(".places__item").remove();
};

export const likeFunc = (event) => {
  event.target
    .closest(".card__like-button")
    .classList.toggle("card__like-button_is-active");
};