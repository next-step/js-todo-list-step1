import {$todoList, $newTodoTitle} from "../todoDOM.js";

export const todoInput = () => {
  $newTodoTitle.addEventListener('keyup', addTodoItem);
 }

const addTodoItem = ({target, key}) => {
    if(target.value && key === 'Enter'){

        $todoList.insertAdjacentHTML('beforeend' ,newTodoItem(target.value));
        target.value = '';
    }
    
}

const newTodoItem = (title) => {
    return `<li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${title}" />
  </li>`
}
