window.onload = function() {
  const mainInput = document.getElementById("new-todo-title");
  const mainList = document.getElementById("todo-list");

  mainInput.addEventListener("keydown", e => {
    // console.log(e.key);
    if(e.key === "Enter" && mainInput.value.replace(/ /g,"") != "") {
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

      inputToggleElement.addEventListener("input", e => {
        const target = e.target.parentNode.parentNode;
        if(e.target.checked) return target.classList.add("completed");
        target.classList.remove("completed");
      })
      
      buttonDestroyElement.addEventListener("click", e => {
        e.target.parentNode.parentNode.remove();
      })

      liElement.addEventListener("dblclick", e => {
        const parentLi = parent(e.target, "li");
        parentLi.classList.add("editing");
        parentLi.childNodes[1].focus();
      })

      inputEditElement.addEventListener("blur", e => {
        const parentLi = parent(e.target, "li");
        const siblingDiv = e.target.previousSibling.childNodes[1];
        parentLi.classList.remove("editing");
        siblingDiv.innerHTML = e.target.value;
      })

      inputEditElement.addEventListener("keydown", e => {
        if(e.key === "Enter") {
          const parentLi = parent(e.target, "li");
          const siblingDiv = e.target.previousSibling.childNodes[1];
          parentLi.classList.remove("editing");
          siblingDiv.innerHTML = e.target.value;
        }
        if(e.key === "Escape") {
          const parentLi = parent(e.target, "li");
          const siblingDiv = e.target.previousSibling.childNodes[1];
          parentLi.classList.remove("editing");
          e.target.value = siblingDiv.innerHTML;
        }
      })

      labelLabelElement.innerHTML = mainInput.value;
      inputEditElement.value = mainInput.value;

      viewDivElement.append(inputToggleElement, labelLabelElement, buttonDestroyElement);
      liElement.append(viewDivElement, inputEditElement);
      mainList.append(liElement);

      mainInput.value = "";
    }
  })

}

function parent(target, tag) {
  while(target.tagName.toLowerCase() != tag) {
    target = target.parentNode;
  }
  return target;
}