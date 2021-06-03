<<<<<<< HEAD
import { CLASS_NAME, TRIGGER } from "../const/CONST.js";
import { getTodoList, getTotalCount } from "../store/todoList.js";
import { getElement } from "../utils/element.js";
=======
import { getTodoList, getTotalCount } from "../store/todoList.js";
import { getEletemt } from "../utils/element.js";
>>>>>>> d6b99b4c9772ac0892fd1faa79029bc450296dc5


const todoItemHtml = ({id, text, completed}) => {
  return `<li id="${id}" class="todo-item ${completed ? 'completed' : ''}">
  <div class="view">
      <input data-event="${TRIGGER.UPDATE_COMPLETED}" class="toggle" type="checkbox" id="${id}" ${completed ? 'checked' : ''}>
      <label data-event="${TRIGGER.UPDATE_EDITING_MODE}" class="label">${text}</label>
      <button data-event="${TRIGGER.DELETE}" class="destroy" id="${id}"></button>
  </div>
  <input data-event="${TRIGGER.UPDATE_TEXT}" class="edit" value="${text}">
</li>`
}

const renderTodoList = () => {
  const $todoList = getElement(CLASS_NAME.$LIST);
  $todoList.innerHTML = getTodoList().map(todoItemHtml).join('');
}

const renderCount = () => {
  const $count = getElement(CLASS_NAME.$COUNTER);
  $count.textContent = getTotalCount();

}

export const renderView = () => {
  renderTodoList();
  renderCount();
}