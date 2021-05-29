import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";
const $todoList = $("#todo-list");
const is_complete = true;
export function TodoList() {
  drawList();
}

export const drawList = () => {
  let viewList = TodoItem.todoList.filter((s) => {
    return TodoItem.listStatus == "all" || is_complete == s.complete;
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
};
