const todoTitleInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");

const enterTitle = (event) => {
  if (!event.isComposing && event.key === "Enter") {
    const inputText = todoTitleInput.value;
    if (inputText !== "") {
      const list = document.createElement("li");
      const view = document.createElement("div");
      const checkBox = document.createElement("input");
      const label = document.createElement("label");
      const finBtn = document.createElement("button");
      const edit = document.createElement("input");

      todoList.appendChild(list);
      list.appendChild(view);
      list.appendChild(edit);
      view.appendChild(checkBox);
      view.appendChild(label);
      view.appendChild(finBtn);

      list.className = "false";
      view.className = "view";
      edit.className = "edit";
      checkBox.className = "toggle";
      checkBox.type = "checkbox";
      label.className = "label";
      finBtn.className = "destroy";

      label.textContent = inputText;
      todoTitleInput.value = "";

      checkBox.addEventListener("click", checkFin);

      function checkFin(event) {
        console.dir(checkBox.checked);
        if (list.className === "false") {
          list.className = "completed";
          checkBox.setAttribute("checked", true);
        } else {
          list.className = "false";
          checkBox.setAttribute("checked", false);
        }
      }
    }
  }
};

todoTitleInput.addEventListener("keydown", enterTitle);
