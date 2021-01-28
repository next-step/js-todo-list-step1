import {$todoList} from "./todoDOM.js";
import {newTodoItem} from "./components/todoInput.js";
import {todoCount} from "./components/todoCount.js"

export let todoItems = [];

export const addToStorage = (value, status) => {

    const newItem = {
        value,
        status
    }

    todoItems = [...todoItems, newItem];
    saveTodo();
}

const saveTodo = () => {
    localStorage.setItem('todo',JSON.stringify(todoItems));
}

export const removeFromStorage = (target) => {

    const $targetValue = target.closest('li').querySelector('.edit').value;
    let index=0;

    todoItems.forEach((item)=>{
        if(item.value === $targetValue) return;
        index ++;
    });

    todoItems.splice(index, 1);
    saveTodo();
}


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