import Todos from "./todos.js";

export const fetchTodos = (key) => {
    const todos = localStorage.getItem(key);
    return todos ?  Todos.of(todos) : Todos.init();
}