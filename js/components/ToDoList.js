import {count} from "../components/ToDoCount.js";
import {removetoDosObj} from "../store/store.js";
export {cancel, deleteTodoItem, editing, completed
}

const $toDoList = document.querySelector(".todo-list");

function cancel(closestLi){
    closestLi.classList.remove("editing");
}


function deleteTodoItem  (closestLi){
    const textlabel = closestLi.querySelector(".label");
    closestLi.remove();
    removetoDosObj(textlabel.innerText);
    count($toDoList.childElementCount);
}

function editing(closestLi){
    if( closestLi.classList.contains ("editing"))        
        closestLi.classList.remove("editing");    
    else{
        closestLi.classList.add("editing");
    }
}

function completed(closestLi) {
    const isCompleted = closestLi.classList.contains("completed");
    closestLi.classList[isCompleted ? 'remove' : 'add']("completed");
}