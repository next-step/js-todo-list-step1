import {$todoList} from "../todoDOM.js";
import {newTodoItem} from "../components/todoInput.js";
import {todoCount} from "../components/todoCount.js";
import {todoItems} from "./localStorage.js";

export const loadTodo = () => {
    console.log("now loading");

    let loadedItems = localStorage.getItem('todo');

    if(loadedItems !== null){
        loadedItems = JSON.parse(loadedItems); 
        loadedItems.forEach((item) => todoItems.push(item));

        //console.log(loadedItems);
        todoItems.forEach((item)=>{
            $todoList.insertAdjacentHTML('beforeend', newTodoItem(item.value));
            checkStatus(item);
        });

    }

    todoCount('all');
}

const checkStatus = (item) => {
    const status = item.status;

    if(status !== "completed"){
       return;
     } else {
        const $list = $todoList.lastChild;
        const $toggle = $list.querySelector('.toggle');

        $list.classList.toggle('completed');
        $toggle.toggleAttribute('checked'); 
    }       
        
}