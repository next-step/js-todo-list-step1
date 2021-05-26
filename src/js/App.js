import { $ } from "./utils/utils.js";

const $todoInput = $(".new-todo");
const $todoList = $("#todo-list");

let todoList = [];
let viewList = [];
let listStatus = "all";
const is_complete = true;

function drawList() {
  viewList = todoList.filter((s) => {
    return listStatus == "all" || is_complete == s.complete;
  });
  $todoList.innerHTML = "";
  viewList.forEach((input) => {
    $todoList.innerHTML += `
    <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${input.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${input.title} />
  </li>
`;
  });
}

function addList(value) {
  if (todoList.length == 0) {
    todoList.push({ id: 0, title: value, complete: false });
    return;
  }
  const id = todoList[todoList.length - 1].id + 1;
  todoList.push({ id: id, title: value, complete: false });
  console.log(todoList);
}

const addTodo = ({ target, key }) => {
  const value = target.value;
  if (key != "Enter") return;
  addList(value);
  $todoInput.value = "";
  drawList();
};
console.log($todoInput);
$todoInput.addEventListener("keyup", addTodo);
