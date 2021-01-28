import {$todoList} from "../todoDOM.js";
import {newTodoItem} from "../components/todoInput.js";
import {todoCount} from "../components/todoCount.js";

export const loadTodo = () => {
    console.log("now loading");

    let loadedItems = localStorage.getItem('todo');

    if(loadedItems !== null){
        loadedItems = JSON.parse(loadedItems);
        console.log(loadedItems);

        loadedItems.forEach((item) => {
            $todoList.insertAdjacentHTML('beforeend', newTodoItem(item.value));
        });
    }

    todoCount('all');
}