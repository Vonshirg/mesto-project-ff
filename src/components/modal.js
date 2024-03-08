export function openModal(popupOpen) {
  popupOpen.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscModal);
};

export function closeModal(event) {
  const bt = event.target.closest(".popup_is-opened");
  bt.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", closeEscModal);
};

export function closeEscModal(event) {
  if (event.key === "Escape") {
    const pop = document.querySelector(".popup_is-opened");
    pop.classList.toggle("popup_is-opened");
  }
};
