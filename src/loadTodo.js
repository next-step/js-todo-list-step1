import {$todoList} from "./todoDOM.js";
import {newTodoItem} from "./components/todoInput.js";
import {todoCount} from "./components/todoCount.js"



let todoItems = [];

export const addToStorage = (value, status) => {
    console.log("active");
    const newItem = {
        value,
        status
    }

    todoItems = [...todoItems, newItem];
    localStorage.setItem('todo', JSON.stringify(todoItems));

}

export const loadTodo = () => {

    let loadedItems = localStorage.getItem('todo');
    console.log(JSON.parse(loadedItems));

    if(loadedItems !== null){
        loadedItems = JSON.parse(loadedItems);

        loadedItems.forEach((item) => {
            $todoList.insertAdjacentHTML('beforeend', newTodoItem(item.value));
        });
    }

    todoCount('all');
}