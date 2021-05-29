import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";
const $todoList = $("#todo-list");
const is_complete = true;
export function TodoList() {
  drawList();

  $todoList.addEventListener("click", listClick);
  $todoList.addEventListener("dblclick", listDbClick);
  $todoList.addEventListener("keyup", listKeyUp);
}

export const drawList = () => {
  let viewList = TodoItem.todoList.filter((s) => {
    return TodoItem.listStatus == "all" || is_complete == s.complete;
  });

  $todoList.innerHTML = "";
  viewList.forEach((input) => {
    $todoList.innerHTML += `
    <li ${input.complete ? "class=completed" : ""} data-id=${input.id}>
    <div class="view">
      <input class="toggle" ${
        input.complete ? "checked" : ""
      }  type="checkbox"/>
      <label class="label" >${input.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value=${input.title} />
  </li>
`;
  });
};

const listClick = ({ target }) => {
  const id = target.closest("li").dataset["id"];
  if (target.className == "toggle") return setComplete(id);
  if (target.className == "destroy") return deleteTodo(id);
};

const listDbClick = ({ target }) => {
  const id = target.closest("li").dataset["id"];
  if (target.className != "label") return;
  target.closest("li").className = "editing";
};

const listKeyUp = ({ target, key }) => {
  if (key == "Enter") return modifyTodo(target);
  if (key == "Escape") return drawList();

  console.log(key);
};

const deleteTodo = (id) => {
  TodoItem.deleteItem(id);
  drawList();
};

const setComplete = (id) => {
  console.log("col", id);
  TodoItem.changeComplete(id);
  drawList();
  //   drawList();
};

const modifyTodo = (target) => {
  const id = target.closest("li").dataset["id"];
  const title = target.value;
  console.log(title);
  TodoItem.modifyItem(id, title);
  drawList();
};
