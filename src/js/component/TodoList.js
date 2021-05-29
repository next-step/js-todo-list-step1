import { $ } from "../utils/utils.js";
const $todoList = $("#todo-list");
const is_complete = true;
export function TodoList(todoList, listStatus) {
  drawList(todoList, listStatus);
  return drawList;
}

const drawList = (todoList, listStatus) => {
  let viewList = todoList.filter((s) => {
    return listStatus == "all" || is_complete == s.complete;
  });
  console.log("drawList", todoList, viewList, listStatus);
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
  console.log($todoList);
};
