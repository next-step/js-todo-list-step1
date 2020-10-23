window.onload = function() {
  const input = document.getElementById("new-todo-title");
  const list = document.getElementById("todo-list");

  input.addEventListener("keydown", e => {
    if(e.keyCode === 13) {
      console.log(e.keyCode);
      const liElement = document.createElement("li");
      const viewDivElement = document.createElement("div");
      const inputEditElement = document.createElement("input");
      const inputToggleElement = document.createElement("input");
      const labelLabelElement = document.createElement("label");
      const buttonDestroyElement = document.createElement("button");

      viewDivElement.setAttribute("class", "view");
      inputEditElement.setAttribute("class", "edit");
      inputToggleElement.setAttribute("class", "toggle");
      inputToggleElement.setAttribute("type", "checkbox");
      labelLabelElement.setAttribute("class", "label");
      buttonDestroyElement.setAttribute("class", "destroy");

      labelLabelElement.innerHTML= input.value;

      viewDivElement.append(inputToggleElement, labelLabelElement, buttonDestroyElement);
      liElement.append(viewDivElement, inputEditElement);
      list.appendChild(liElement);
    }
  })
}