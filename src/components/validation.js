export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export function showInputError(formElement, inputElement, validationConf) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConf.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationConf.errorClass);
}

export function hideInputError(formElement, inputElement, validationConf) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationConf.inputErrorClass);
    errorElement.classList.remove(validationConf.errorClass);
    errorElement.textContent = "";
  }
}

export function checkValidation(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(
  inputList,
  validationConf,
  buttonElementReturn
) {
  if (hasInvalidInput(inputList)) {
    buttonElementReturn.disabled = true;
    buttonElementReturn.classList.add(validationConf.inactiveButtonClass);
  } else {
    buttonElementReturn.disabled = false;
    buttonElementReturn.classList.remove(validationConf.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, validationConf) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConf.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConf.submitButtonSelector
  );
  toggleButtonState(inputList, validationConfig, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(inputList, validationConfig, buttonElement);
      checkValidation(formElement, inputElement);
    });
  });
};

export const enableValidation = (validationConf) => {
  const formElementlist = Array.from(
    document.querySelectorAll(validationConf.formSelector)
  );
  formElementlist.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

export function clearValidation(formElement, validationConf) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConf.inputSelector)
  );
  const buttonElementRet = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validationConfig)
  );
  toggleButtonState(inputList, validationConfig, buttonElementRet);
}
