import renderCard from "./renderElement.js";

let all = document.querySelector(".all");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");

const setEventFilter = () => {
  all.addEventListener("click", function () {
    all.classList.add("selected");
    active.classList.remove("selected");
    completed.classList.remove("selected");
    renderCard();
  });
  active.addEventListener("click", function () {
    all.classList.remove("selected");
    active.classList.add("selected");
    completed.classList.remove("selected");
    renderCard();
  });
  completed.addEventListener("click", function () {
    all.classList.remove("selected");
    active.classList.remove("selected");
    completed.classList.add("selected");
    renderCard();
  });
};

export default setEventFilter;
