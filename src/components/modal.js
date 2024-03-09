export function openModal(popupOpen) {
  popupOpen.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscModal);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscModal);
}

export function closeEscModal(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}
