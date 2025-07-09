import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import "./index.css";
import profilepicture from "../images/avatar.jpg";
import logo from "../images/logo.svg";

const logoImg = document.getElementById("logo");
const profilePic = document.getElementById("profile-picture");

profilePic.src = profilepicture;
logoImg.src = logo;

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseBtn =
  editProfileModal.querySelector(".modal__close-btn");
const modalCloseButtons = document.querySelectorAll(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileFormElement = document.querySelector(".modal__form");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalCloseBtn = newPostModal.querySelector(".modal__close-btn");
const modalSubmitButton = newPostModal.querySelector(".modal__save-button");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostCaptionInput = newPostModal.querySelector("#caption");
const newPostLinkInput = newPostModal.querySelector("#image-link");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const previewModalElement = document.querySelector("#preview-modal");
const previewModalCloseBtn =
  previewModalElement.querySelector(".modal__close-btn");
const previewModalImage = previewModalElement.querySelector(".modal__image");
const previewModalCaption =
  previewModalElement.querySelector(".modal__caption");

modalCloseButtons.forEach((button) => {
  const relatedModal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(relatedModal));
});
const modalElements = document.querySelectorAll(".modal");

function handleImageClick(data) {
  previewModalImage.src = data.link;
  previewModalImage.alt = data.name;
  previewModalCaption.textContent = data.name;

  openModal(previewModalElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__description");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const likeBtnElement = cardElement.querySelector(".card__icon");

  likeBtnElement.addEventListener("click", () => {
    likeBtnElement.classList.toggle("card__icon_active");
  });

  const cardDeleteEl = cardElement.querySelector(".card__delete-btn");

  cardDeleteEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    handleImageClick(data);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", closeOpenModalsOnEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", closeOpenModalsOnEscape);
}

modalElements.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function closeOpenModalsOnEscape(evt) {
  if (evt.key === "Escape") {
    modalElements.forEach((modal) => {
      if (modal.classList.contains("modal_is-open")) {
        closeModal(modal);
      }
    });
  }
}

editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editProfileModal,
    [profileNameInput, profileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function renderCard(cardData, method = "prepend") {
  const newCard = getCardElement(cardData);
  cardsContainer[method](newCard);
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };

  console.log(newPostCaptionInput.value);
  console.log(newPostLinkInput.value);

  renderCard(newCardData);

  evt.target.reset();
  disableButton(modalSubmitButton, settings);
  const inputList = Array.from(
    evt.target.querySelectorAll(settings.inputSelector)
  );
  resetValidation(evt.target, inputList, settings);

  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleNewPostFormSubmit);

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

initialCards.forEach(function (cardData) {
  renderCard(cardData, "append");
});

enableValidation(settings);
