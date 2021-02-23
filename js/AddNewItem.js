import { renewStrong } from "./ControlTodoButton.js";

const getWork = document.getElementById("new-todo-title"); 
const todoList = document.getElementById("todo-list"); 

export function initAddNewItem() {
  getWork.addEventListener("keypress", AddNewList);
}

export function AddNewList(e) {
  if (e.key !== "Enter") return;
  if (e.target.value !== "" && !/^\s+|\s+$/g.exec(e.target.value)) {
    const text = e.target.value;
    e.target.value = null;

    const item = listAssemble(text);

    if (!/(completed)/.exec(window.location.href))
      item.classList.add("selected");
    else item.style.display = "none";
  } else {
    alert("불필요한 공백을 제거해주세요!");
  }
  renewStrong();
}

export function listAssemble(content) {
  const li = document.createElement("li");

  const listTemplate = `<div class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label" >${content}</label>
                        <button class="destroy" ></button>
                      </div>
                      <input class="edit" value="${content}" />`;

  li.innerHTML = listTemplate;
  todoList.append(li);

  return li;
}
