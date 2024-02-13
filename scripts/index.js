// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(item, funcDelete) {
  const placesItem = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = placesItem.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const cardTitle = placesItem.querySelector(".card__title");
  cardTitle.textContent = item.name;
  const deleteButton = placesItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => {
    deleteCard(evt);
  });
  return placesItem;
}

// @todo: Функция удаления карточки
const deleteCard = (event) => {
  event.target.closest(".places__item").remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard));
});
console.log(initialCards.length);
