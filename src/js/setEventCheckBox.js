import { deleteValue, pushValue } from "./localStorageFunc.js";
import renderCard from "./renderElement.js";

let toggleLocalStorage = (value) => {
  let todoData = localStorage.getItem("TODO");
  let todoDataArr = todoData.split(",");
  if (todoDataArr.includes(value)) {
    deleteValue(value, "TODO");
    pushValue(value, "DONE");
    renderCard();
  } else {
    deleteValue(value, "DONE");
    pushValue(value, "TODO");
    renderCard();
  }
};

let setEventCheckBox = () => {
  let toggles = document.querySelectorAll(".toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      let value = toggle.parentElement.children[1].textContent;
      toggleLocalStorage(value);
    });
  });
};

export default setEventCheckBox;
