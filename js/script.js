window.onload = function() {
  const mainInput = document.getElementById("new-todo-title");
  const mainList = document.getElementById("todo-list");
  const listCount = document.querySelector(".todo-count strong");

  mainInput.addEventListener("keydown", e => {
    // console.log(e.key);
    if(e.key === "Enter" && mainInput.value.replace(/ /g,"") != "") {
      const liElement = document.createElement("li");
      const viewDivElement = document.createElement("div");
      const editInputElement = document.createElement("input");
      const toggleInputElement = document.createElement("input");
      const labelLabelElement = document.createElement("label");
      const destroyButtonElement = document.createElement("button");

      viewDivElement.setAttribute("class", "view");
      editInputElement.setAttribute("class", "edit");
      toggleInputElement.setAttribute("class", "toggle");
      toggleInputElement.setAttribute("type", "checkbox");
      labelLabelElement.setAttribute("class", "label");
      destroyButtonElement.setAttribute("class", "destroy");

      toggleInputElement.addEventListener("input", e => {
        const target = e.target.parentNode.parentNode;
        if(e.target.checked) return target.classList.add("completed");
        target.classList.remove("completed");
      });
      
      destroyButtonElement.addEventListener("click", e => {
        e.target.parentNode.parentNode.remove();
        
        const count = mainList.childNodes.length;
        listCount.innerHTML = count;
      });

      liElement.addEventListener("dblclick", e => {
        const parentLi = parent(e.target, "li");
        parentLi.classList.add("editing");
        parentLi.childNodes[1].focus();
      });

      editInputElement.addEventListener("blur", e => {
        const parentLi = parent(e.target, "li");
        const siblingDiv = e.target.previousSibling.childNodes[1];
        parentLi.classList.remove("editing");
        siblingDiv.innerHTML = e.target.value;
      });

      editInputElement.addEventListener("keydown", e => {
        if(e.key === "Enter") {
          const parentLi = parent(e.target, "li");
          const siblingDiv = e.target.previousSibling.childNodes[1];
          parentLi.classList.remove("editing");
          siblingDiv.innerHTML = e.target.value;
        };
        if(e.key === "Escape") {
          const parentLi = parent(e.target, "li");
          const siblingDiv = e.target.previousSibling.childNodes[1];
          parentLi.classList.remove("editing");
          e.target.value = siblingDiv.innerHTML;
        };
      });

      labelLabelElement.innerHTML = mainInput.value;
      editInputElement.value = mainInput.value;

      viewDivElement.append(toggleInputElement, labelLabelElement, destroyButtonElement);
      liElement.append(viewDivElement, editInputElement);
      mainList.append(liElement);

      const count = mainList.childNodes.length;
      listCount.innerHTML = count;

      mainInput.value = "";
    };
  });

};

function parent(target, tag) {
  while(target.tagName.toLowerCase() != tag) {
    target = target.parentNode;
  };
  return target;
};