let container = document.querySelector(".todo-list");
import setEventCheckBox from "./setEventCheckBox.js";
import counter from "./setEventCounter.js";
import setEventAddCard from "./setEventDeleteCard.js";
import setEventDeleteCard from "./setEventDeleteCard.js";
let renderAll = () => {
  renderActive();
  renderCompleted();
};

let renderActive = () => {
  if (localStorage.getItem("TODO") !== "") {
    let cardContents = localStorage.getItem("TODO").split(",");

    cardContents.forEach((contents) => {
      let newLi = document.createElement("li");
      newLi.innerHTML = `
            <div class='view'>
                <input class="toggle" type="checkbox">
                <label class="label">${contents}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${contents}>
        `;
      container.appendChild(newLi);
    });
  }
};

let renderCompleted = () => {
  if (localStorage.getItem("DONE") !== "") {
    let cardContents = localStorage.getItem("DONE").split(",");

    cardContents.forEach((contents) => {
      let newLi = document.createElement("li");
      newLi.className = "completed";
      newLi.innerHTML = `
            <div class='view'>
                <input class="toggle"  type="checkbox" checked>
                <label class="label ">${contents}</label>
                <button class="destroy "></button>
            </div>
            <input class="edit" value=${contents}>
        `;
      container.appendChild(newLi);
    });
  }
};

let renderCard = () => {
  let isSelected = document.querySelector(".selected").classList[0];
  if (isSelected === "all") {
    container.innerHTML = "";
    renderAll();
  }

  if (isSelected === "active") {
    container.innerHTML = "";
    renderActive();
  }

  if (isSelected === "completed") {
    container.innerHTML = "";
    renderCompleted();
  }
  setEventCheckBox();
  // setEventAddCard();
  counter(isSelected);
  setEventDeleteCard();
  // editEvent();
};

export default renderCard;
