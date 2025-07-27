import {
  enableValidation,
  resetValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import "./index.css";
import logo from "../images/logo.svg";
import Api from "../utils/Api.js";
import { handleSubmit } from "../utils/utils.js";

const logoImg = document.getElementById("logo");
const profilePic = document.getElementById("profile-picture");

logoImg.src = logo;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8882c22c-2148-4e06-953e-3bab8baa4120",
    "Content-Type": "application/json",
  },
});

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = document.querySelector(".modal__form");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const profilePicModal = document.querySelector("#profile-picture-modal");
const profilePicBtn = document.querySelector(".profile__avatar-btn");
const profilePicFormElement = profilePicModal.querySelector(".modal__form");
const profilePicInput = profilePicModal.querySelector("#profile-picture-input");

const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardFormElement = deleteCardModal.querySelector(".modal__form");
const deleteCardCancelBtn = deleteCardModal.querySelector(
  ".modal__button_type_cancel"
);

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");

const modalSubmitButton = newPostModal.querySelector(".modal__button");
const modalCloseButtons = document.querySelectorAll(".modal__close-btn");
const modalElements = document.querySelectorAll(".modal");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostCaptionInput = newPostModal.querySelector("#caption");
const newPostLinkInput = newPostModal.querySelector("#image-link");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const previewModalElement = document.querySelector("#preview-modal");
const previewModalImage = previewModalElement.querySelector(".modal__image");
const previewModalCaption =
  previewModalElement.querySelector(".modal__caption");

let selectedCard, selectedCardId;

function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", closeOpenModalsOnEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", closeOpenModalsOnEscape);
}

function closeOpenModalsOnEscape(evt) {
  if (evt.key === "Escape") {
    modalElements.forEach((modal) => {
      if (modal.classList.contains("modal_is-open")) {
        closeModal(modal);
      }
    });
  }
}

function renderCard(cardData, method = "prepend") {
  const newCard = getCardElement(cardData);
  cardsContainer[method](newCard);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__description");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeBtnElement = cardElement.querySelector(".card__icon");
  const cardDeleteEl = cardElement.querySelector(".card__delete-btn");

  if (data.isLiked == true) likeBtnElement.classList.add("card__icon_active");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  likeBtnElement.addEventListener("click", (evt) =>
    handleLikeBtnClick(evt, data._id)
  );

  cardDeleteEl.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );

  cardImageEl.addEventListener("click", () => {
    handleImageClick(data);
  });

  return cardElement;
}

function handleLikeBtnClick(evt, id) {
  evt.preventDefault();

  const likeBtnElement = evt.target;

  api
    .editLikeStatus({
      cardId: id,
      isLiked: !likeBtnElement.classList.contains("card__icon_active"),
    })
    .then(() => {
      likeBtnElement.classList.toggle("card__icon_active");
    })
    .catch((err) => {
      console.error("Error editing like status:", err);
    });
}

function handleImageClick(data) {
  previewModalImage.src = data.link;
  previewModalImage.alt = data.name;
  previewModalCaption.textContent = data.name;

  openModal(previewModalElement);
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteCardModal);
}

function handleDeleteCardFormSubmit(evt) {
  handleSubmit(
    () => {
      return api.deleteCard(selectedCardId).then(() => {
        selectedCard.remove();
        closeModal(deleteCardModal);
      });
    },
    evt,
    "Deleting..."
  );
}

function handleProfileFormSubmit(evt) {
  handleSubmit(() => {
    return api
      .editUserInfo({
        name: profileNameInput.value,
        about: profileDescriptionInput.value,
      })
      .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(editProfileModal);
      });
  }, evt);
}

function handleProfilePicFormSubmit(evt) {
  handleSubmit(() => {
    return api
      .editUserAvatar({
        avatar: profilePicInput.value,
      })
      .then((data) => {
        profilePic.src = data.avatar;
        closeModal(profilePicModal);
        disableButton(evt.submitter, settings);
      });
  }, evt);
}

function handleNewPostFormSubmit(evt) {
  const newCardData = {
    name: newPostCaptionInput.value,
    link: newPostLinkInput.value,
  };

  handleSubmit(() => {
    return api.addCard(newCardData).then((cardDataWithId) => {
      renderCard(cardDataWithId);
      closeModal(newPostModal);
      evt.target.reset();
      disableButton(modalSubmitButton, settings);
      const inputList = Array.from(
        evt.target.querySelectorAll(settings.inputSelector)
      );
      resetValidation(evt.target, inputList, settings);
    });
  }, evt);
}

modalCloseButtons.forEach((button) => {
  const relatedModal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(relatedModal));
});

modalElements.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

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

profilePicBtn.addEventListener("click", function () {
  openModal(profilePicModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

profilePicFormElement.addEventListener("submit", handleProfilePicFormSubmit);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
deleteCardFormElement.addEventListener("submit", handleDeleteCardFormSubmit);
addCardFormElement.addEventListener("submit", handleNewPostFormSubmit);
deleteCardCancelBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    cards.forEach(function (cardData) {
      renderCard(cardData, "append");
    });

    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profilePic.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });

enableValidation(settings);
