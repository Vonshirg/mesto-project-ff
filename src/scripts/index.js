// @todo: Темплейт карточки
import "../pages/index.css";
import { createCard, deleteCard, likeFunc } from "../components/cards.js";
import { closeModal, openModal } from "../components/modal.js";
import {
  clearValidation,
  enableValidation,
  validationConfig,
} from "../components/validation.js";
import {
  getCards,
  getUser,
  editProfile,
  postCard,
  reloadAvatar,
} from "../components/api.js";
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
const formNewAvatar = document.forms["new-avatar"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTitle = document.querySelector(".popup__caption");
const profileImage = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_new-avatar");
let userId = "";

// @todo: Функция визуализации загрузки
function renderLoading(isLoading, event) {
  if (isLoading) {
    event.submitter.textContent = "Сохранение...";
  } else {
    event.submitter.textContent = "Сохранить";
  }
}

// @todo: Вывести карточки на страницу

buttonAddCard.addEventListener("click", () => {
  openModal(popupCard);
});
profileImage.addEventListener("click", () => {
  openModal(popupAvatar);
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
  const popup = evt.target.closest(".popup_is-opened");
  renderLoading(true, evt);
  editProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popup);
      formProfile.reset();
      clearValidation(formProfile, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}

// @todo: Загрузка нового аватара профиля
function loadNewAvatar(evt) {
  evt.preventDefault();
  const url = formNewAvatar.elements.avatar.value;
  const popup = evt.target.closest(".popup_is-opened");
  renderLoading(true, evt);
  reloadAvatar(url)
    .then(() => {
      profileImage.style = `background-image:  url(${url})`;
      closeModal(popup);
      formNewAvatar.reset();
      clearValidation(formNewAvatar, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}
// @todo: Добавление карточки
function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.link = formNewPlace.elements.link.value;
  newCard.name = formNewPlace.elements["place-name"].value;
  newCard.owner = { _id: userId };
  renderLoading(true, evt);
  postCard(
    formNewPlace.elements["place-name"].value,
    formNewPlace.elements.link.value
  )
    .then((res) => {
      newCard._id = res._id;
      placesList.prepend(
        createCard(
          newCard,
          deleteCard,
          cardTemplate,
          openCardPopup,
          likeFunc,
          userId
        )
      );
      const popup = evt.target.closest(".popup_is-opened");
      closeModal(popup);
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}
enableValidation(validationConfig);

formProfile.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", addNewCard);
formNewAvatar.addEventListener("submit", loadNewAvatar);

Promise.all([getCards(), getUser()], userId)
  .then(([cards, user]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    userId = user._id;
    profileImage.style = `background-image:  url(${user.avatar})`;
    cards.forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          deleteCard,
          cardTemplate,
          openCardPopup,
          likeFunc,
          userId
        )
      );
    });
    return (userId = user._id);
  })
  .catch((err) => {
    console.log(err);
  });
