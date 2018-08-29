const menuButton = document.querySelector(".main-nav__button");
const menu = document.querySelector(".main-nav");

menu.classList.remove("no-js");

menuButton.addEventListener("click", function(evt) {
  evt.preventDefault();

  menu.classList.toggle("main-nav--shown");
})
