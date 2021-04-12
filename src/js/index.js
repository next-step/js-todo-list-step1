const todoTitleInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");

const enterTitle = (event) => {
  const inputText = todoTitleInput.value;
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

  list.classList.add("false");
  view.classList.add("view");
  edit.classList.add("edit");
  checkBox.classList.add("toggle");
  checkBox.type = "checkbox";
  label.classList.add("label");
  finBtn.classList.add("destroy");

  label.textContent = inputText;
  todoTitleInput.value = "";
};

todoTitleInput.addEventListener("change", enterTitle);
