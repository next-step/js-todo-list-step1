import Todos from "./todos.js";

export const fetchTodos = (key) => {
    try {
        const todos = localStorage.getItem(key);
        return todos ?  Todos.of(JSON.parse(todos)) : Todos.init();
    } catch(e) {
        console.error(e)
    }
}

export const saveTodo = (key, {todos}) => {
    try {
        localStorage.setItem(key, JSON.stringify(todos))
    } catch(e) {
        console.error(e)
    }
};