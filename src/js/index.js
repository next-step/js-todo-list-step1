const todoTitleInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
const todoCount = document.querySelector(".todo-count");
const countingNum = todoCount.querySelector("strong");

let countItems = 0;

const addItem = (event) => {
  if (!event.isComposing && event.key === "Enter") {
    const inputText = todoTitleInput.value;
    if (inputText !== "") {
      countItems++;
      countingNum.textContent = countItems;

      const id = Date.now();

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
      list.id = id;
      view.className = "view";
      edit.className = "edit";
      checkBox.className = "toggle";
      checkBox.id = id;
      checkBox.type = "checkbox";
      label.className = "label";
      finBtn.className = "destroy";
      finBtn.id = id;

      label.textContent = inputText;
      edit.setAttribute("value", inputText);

      todoTitleInput.value = "";

      checkBox.addEventListener("click", checkFin);
      finBtn.addEventListener("click", removeItem);
      label.addEventListener("dblclick", editItem);
      edit.addEventListener("keydown", finEdit);

      function checkFin(event) {
        if (list.className === "false") {
          list.className = "completed";
          checkBox.setAttribute("checked", true);
        } else {
          list.className = "false";
          checkBox.setAttribute("checked", false);
        }
      }

      function removeItem(event) {
        todoList.removeChild(list);
        countItems--;
        countingNum.textContent = countItems;
      }

      function editItem(event) {
        list.classList.add("editing");
      }

      function finEdit(event) {
        const editText = edit.value;
        if (event.key === "Escape") {
          list.classList.remove("editing");
          edit.setAttribute("value", editText);
        }
        if (!event.isComposing && event.key === "Enter") {
          list.classList.remove("editing");
          label.textContent = editText;
        }
      }
    }
  }
};

todoTitleInput.addEventListener("keydown", addItem);
