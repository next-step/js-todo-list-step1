import { TodoInput, TodoList, TodoCount, TodoFilters } from "./components/index.js";
import {store} from "./modules/index.js";

export default class App {
    constructor() {
        const todoInputTarget = document.querySelector('#new-todo-title');
        const todoListTarget = document.querySelector('#todo-list');
        const todoCountTarget = document.querySelector('.todo-count');
        const todoFilterTarget = document.querySelector('.filters');

        new TodoInput(todoInputTarget);
        new TodoList(todoListTarget);
        new TodoFilters(todoFilterTarget);
        new TodoCount(todoCountTarget);

        store.subscribe(() => {
            new TodoList(todoListTarget);
            new TodoFilters(todoFilterTarget);
            new TodoCount(todoCountTarget);
        });
    }
}