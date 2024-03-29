// @todo: Темплейт карточки
import "../pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  likeFunc,
} from "../components/cards.js";
import { closeModal, openModal } from "../components/modal.js";
import {clearValidation, enableValidation, validationConfig} from "../components/validation.js";
import {getCards, getUser, editProfile, postCard} from "../components/api.js";
// @todo: DOM узлы

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = document.querySelector(".popup__image");
const popupCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonsPopupClose = document.querySelectorAll(".popup__close");
const popupType = document.querySelector(".popup_type_edit");
const popups = document.querySelectorAll(".popup");
const formProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTitle = document.querySelector(".popup__caption");



// @todo: Вывести карточки на страницу

buttonAddCard.addEventListener("click", () => {
  openModal(popupCard);
});
buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupType);
});

buttonsPopupClose.forEach((btn) => {
  btn.addEventListener("mousedown", (evt) => {
    const popup = evt.target.closest(".popup_is-opened");
    closeModal(popup);
  });
});

popups.forEach((btn) => {
  btn.classList.add("popup_is-animated");
  btn.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") &&
      !evt.target.classList.contains("popup__close")
    ) {
      closeModal(btn);
    }
  });
});

function openCardPopup(event) {
  popupImage.src = event.target.closest(".card__image").src;
  popupImage.alt = event.target.closest(".card__image").alt;
  cardTitle.textContent = popupImage.alt;
  openModal(popupTypeImage);
}
// @todo: Редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const popup = evt.target.closest(".popup_is-opened");
  editProfile(nameInput.value, jobInput.value);
  closeModal(popup);
  formProfile.reset();
  clearValidation(formProfile,validationConfig);
}
// @todo: Добавление карточки
function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.link = formNewPlace.elements.link.value;
  newCard.name = formNewPlace.elements["place-name"].value;
  newCard.owner= {_id: 'f60d86de6f110eb2f37b45d5'};
  placesList.prepend(
    createCard(newCard, deleteCard, cardTemplate, openCardPopup, likeFunc, 'f60d86de6f110eb2f37b45d5')
  );
  postCard(formNewPlace.elements["place-name"].value, formNewPlace.elements.link.value);
  const popup = evt.target.closest(".popup_is-opened");
  closeModal(popup);
  formNewPlace.reset();
  clearValidation(formNewPlace,validationConfig);
}
enableValidation(validationConfig);

formProfile.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", addNewCard);

console.log(getCards());
console.log(getUser());


Promise.all([getCards(), getUser()])
  .then(([cards, user]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    let userId = user._id;
    cards.forEach((cardData) => {
      placesList.append(createCard(cardData, deleteCard, cardTemplate, openCardPopup, likeFunc, userId)); 
    });
    
})
  .catch((err) => {
    console.log(err);
  });

  

  


