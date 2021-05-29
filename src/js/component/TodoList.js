import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";
const $todoList = $("#todo-list");
const is_complete = true;
export function TodoList() {
  drawList();

  $todoList.addEventListener("click", setComplete);
}

export const drawList = () => {
  let viewList = TodoItem.todoList.filter((s) => {
    return TodoItem.listStatus == "all" || is_complete == s.complete;
  });

  $todoList.innerHTML = "";
  viewList.forEach((input) => {
    $todoList.innerHTML += `
    <li class=${input.complete ? "completed" : ""}>
    <div class="view" data-id=${input.id}>
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

const setComplete = ({ target }) => {
  if (target.className != "toggle") return;
  const $div = target.closest("div");
  const id = target.closest("div").dataset["id"];
  TodoItem.changeComplete(id);
  drawList();
  //   drawList();
};
