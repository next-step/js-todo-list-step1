import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";
const $todoList = $("#todo-list");
const is_complete = true;
export function TodoList() {
  drawList();

  $todoList.addEventListener("click", listClick);
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
  const id = target.closest("div").closest("li").dataset["id"];
  if (target.className == "toggle") return setComplete(id);
  if (target.className == "destroy") return deleteTodo(id);
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
