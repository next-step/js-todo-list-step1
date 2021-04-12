let container = document.querySelector(".todo-list");
import setToggle from "./onCardEvent.js";
import { deleteValue, pushValue } from "./localStorageFunc.js";

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

let addDeleteEvent = () => {
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

let editEvent = () => {
  let cards = document.querySelectorAll(".todo-list > li");
  // cards[0].children[0].children[1];
  cards.forEach((card) => {
    card.children[1].addEventListener("dblcick", function () {
      card[1].classList.toggle("editing");
    });
  });
};

let counter = (status) => {
  let count = 0;
  if (status === "all") {
    if (localStorage.getItem("TODO") !== "") {
      count += localStorage.getItem("TODO").split(",").length;
    }
    if (localStorage.getItem("DONE") !== "") {
      count += localStorage.getItem("DONE").split(",").length;
    }
  }
  if (status === "active") {
    if (localStorage.getItem("TODO") !== "") {
      count += localStorage.getItem("TODO").split(",").length;
    }
  }
  if (status === "completed") {
    if (localStorage.getItem("DONE") !== "") {
      count += localStorage.getItem("DONE").split(",").length;
    }
  }

  let countElement = document.querySelector(".todo-count");
  countElement.children[0].textContent = count;
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
  setToggle();
  addDeleteEvent();
  counter(isSelected);
  // editEvent();
};

export default renderCard;
