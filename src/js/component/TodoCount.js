import { $ } from "../utils/utils.js";
import * as TodoItem from "../TodoItem.js";

const $todocount = $(".todo-count > strong");

export const TodoCount = () => {};

export const drawTodoCount = (viewList) => {
  $todocount.innerText = viewList.length;
};
