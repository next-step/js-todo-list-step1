import renderCard from "./renderElement.js";

let inputBox = document.querySelector(".new-todo");

let setEventAddCard = () => {
  inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let inputText = document.querySelector(".new-todo").value;
      let TODOITEM = localStorage.getItem("TODO");
      if (inputText !== "") {
        if (TODOITEM !== "") {
          let TODOARR = TODOITEM.split(",");
          TODOARR.push(inputText);
          inputText = TODOARR;
        }
        document.querySelector(".new-todo").value = "";
        localStorage.setItem("TODO", [inputText]);

        renderCard();
      }
    }
  });
};

export default setEventAddCard;
