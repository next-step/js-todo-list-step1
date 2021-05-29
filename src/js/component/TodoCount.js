import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";
import { drawList } from "./TodoList.js";

const $todocount = $(".todo-count > strong");
const $todofilters = $(".filters");
const $todofiltersA = document.querySelectorAll(".filters a");
let todoStatus = "all";

export const TodoCount = () => {};

export const drawTodoCount = (viewList) => {
  $todocount.innerText = viewList.length;
};

const countClick = ({ target }) => {
  target.classList.remove("selected");
  TodoItem.setStatus(target.className);
  $todofiltersA.forEach((item) => item.classList.remove("selected"));
  target.className += " selected";
  drawList();
};

$todofilters.addEventListener("click", countClick);
