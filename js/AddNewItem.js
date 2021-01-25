import { renewStrong } from "./ControlTodoButton.js";

const getWork = document.getElementById("new-todo-title"); // 할 일을 적는 input 태그
const todoList = document.getElementById("todo-list"); // 작성한 할 일이 삽입되는 ul 태그

export function initAddNewItem() {
  getWork.addEventListener("keypress", AddNewList);
}

export function AddNewList(e) {
  // 새로운 항목을 추가하는 기능
  if (e.key !== "Enter") return;
  if (e.target.value !== "" && !/^\s+|\s+$/g.exec(e.target.value)) {
    let text = e.target.value;
    e.target.value = null;

    let item = listAssemble(text);

    if (!/(completed)/.exec(window.location.href))
      item.classList.add("selected");
    else item.style.display = "none";
  } else {
    alert("불필요한 공백을 제거해주세요!");
  }
  renewStrong();
}

export function listAssemble(content) {
  let li = document.createElement("li");

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
