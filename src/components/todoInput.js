import {$todoList, $newTodoTitle} from "../todoDOM.js";
import {todoCount} from "./todoCount.js";
import {filterStatus} from "./todoFilter.js";
import {addToStorage} from "../localStorage/localStorage.js";

export const todoInput = () => {
  $newTodoTitle.addEventListener('keyup', addTodoItem);
 }

const addTodoItem = ({target, key}) => {
    if(target.value && key === 'Enter'){
        $todoList.insertAdjacentHTML('beforeend', newTodoItem(target.value));
        
        addToStorage(target.value, 'active');
        target.value = '';
    }

    // todo가 추가될 때마다 count 수 변경
    todoCount(filterStatus); 
    
}

export const newTodoItem = (title) => {
    return `<li class=">
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${title}" />
  </li>`
}
