// input 가져오기
const todoTitleInput = document.getElementById("new-todo-title");
const todoList = document.getElementById("todo-list");
// Enter key Event 설정

const enterTitle = (event) => {
  if (event.key === "Enter") {
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

      list.classList.add("false");
      view.classList.add("view");
      edit.classList.add("edit");
      checkBox.classList.add("toggle");
      checkBox.type = "checkbox";
      label.classList.add("label");
      finBtn.classList.add("destroy");

      label.textContent = inputText;
      todoTitleInput.value = "";
    }
  }
};

todoTitleInput.addEventListener("keydown", enterTitle);
