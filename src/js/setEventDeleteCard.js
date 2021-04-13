import { deleteValue, pushValue } from "./localStorageFunc.js";
import renderCard from "./renderElement.js";

let setEventDeleteCard = () => {
  let deleteBtn = document.querySelectorAll(".destroy");
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let value = btn.parentElement.children[1].textContent;
      let isChecked = btn.parentElement.children[0].checked;
      if (isChecked) {
        deleteValue(value, "DONE");
      } else {
        deleteValue(value, "TODO");
      }
      renderCard();
    });
  });
};

export default setEventDeleteCard;
