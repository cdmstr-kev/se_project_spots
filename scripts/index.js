const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseBtn =
  editProfileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const PostModalCloseBtn = newPostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-open");
});

profileModalCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-open");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-open");
});

PostModalCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-open");
});
