import { getTodoList, getTotalCount } from "../store/todoList.js";
import { getEletemt } from "../utils/element.js";


const todoItemHtml = ({id, text, completed}) => {
  return `<li id="${id}" class="todo-item ${completed ? 'completed' : ''}">
  <div class="view">
      <input data-event="update:completed" class="toggle" type="checkbox" id="${id}" ${completed ? 'checked' : ''}>
      <label data-event="update:editing-mode" class="label">${text}</label>
      <button data-event="delete" class="destroy" id="${id}"></button>
  </div>
  <input data-event="update:text" class="edit" value="${text}">
</li>`
}

const renderTodoList = () => {
  const $todoList = getEletemt('.todo-list');
  $todoList.innerHTML = getTodoList().map(todoItemHtml).join('');
}

const renderCount = () => {
  const $count = getEletemt('.todo-count strong');
  $count.textContent = getTotalCount();

}

export const renderView = () => {
  renderTodoList();
  renderCount();
}