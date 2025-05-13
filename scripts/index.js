const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseBtn =
  editProfileModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileFormElement = document.querySelector(".modal__form");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector("#description");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostModalCloseBtn = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostCaptionInput = newPostModal.querySelector("#caption");
const newPostLinkInput = newPostModal.querySelector("#image-link");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-open");
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileModalCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-open");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  console.log(newPostLinkInput.value);
  console.log(newPostCaptionInput.value);

  newPostModal.classList.remove("modal_is-open");
}

addCardFormElement.addEventListener("submit", handleNewPostFormSubmit);

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
});

newPostModalCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
});
