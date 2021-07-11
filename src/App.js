import { ToDoInput,ToDoList } from "./component/index.js";
class App {
    $todoInput;
    $todoList;
    constructor(){
        const toDoInputTarget = document.querySelector("#new-todo-title");
        const toDoListTarget = document.querySelector('#todo-list');
        this.$todoInput = new ToDoInput(toDoInputTarget);
        this.$todoList = new ToDoList(toDoListTarget);
    }
}

const app = new App();