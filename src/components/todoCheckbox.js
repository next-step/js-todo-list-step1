import {$todoList} from "../todoDOM.js";
import {todoCount} from "./todoCount.js";
import {removeFromStorage, todoItems, findIndexOfTarget, saveTodo} from "../localStorage/localStorage.js";

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

   const index = findIndexOfTarget(target);
   const status = todoItems[index].status;

   if(status === "active"){
        todoItems[index].status = "completed";
   } else if(status === "completed"){
        todoItems[index].status = "active";
   }
   console.log(todoItems[index].status);
   saveTodo();

}

const removeTodo = (target) => {

    target.closest('li').remove();

    todoCount('all');
    removeFromStorage(target);

}