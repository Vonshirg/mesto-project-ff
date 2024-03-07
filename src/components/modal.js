export function openModal(popupOpen) {
  popupOpen.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

export function closeModal(event) {
  let bt = event.target.closest(".popup_is-opened");
  bt.classList.toggle("popup_is-opened");
}

export function keyHandler(event) {
  if (event.key === "Escape") {
    const pop = document.querySelector(".popup_is-opened");
    pop.classList.toggle("popup_is-opened");
  }
}
