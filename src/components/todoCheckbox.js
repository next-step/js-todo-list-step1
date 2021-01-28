import {$todoList} from "../todoDOM.js";
import {todoCount} from "./todoCount.js";
import {removeFromStorage} from "../loadTodo.js";

export const todoCheckbox = () => {
    $todoList.addEventListener('click', changeTodo);
}

const changeTodo = ({target}) =>{
    if(target.className === 'toggle'){
        completeTodo(target);
    } else if(target.className === 'destroy'){
        removeTodo(target);
    }
}

const completeTodo = (target) => {
   target.toggleAttribute('checked');
   target.closest('li').classList.toggle('completed');
}

const removeTodo = (target) => {

    target.closest('li').remove();

    todoCount('all');
    removeFromStorage(target);

}