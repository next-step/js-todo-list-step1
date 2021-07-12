import { ToDoInput,ToDoList } from "./component/index.js";
class App {
    $todoInput;
    $todoList;
    constructor(){
        const toDoInputTarget = document.querySelector("#new-todo-title");
        const toDoListTarget = document.querySelector('#todo-list');
        this.$todoInput = new ToDoInput(toDoInputTarget,{
            addToDoItem: itemTitle => this.addToDoItem(itemTitle)
        });
        this.$todoList = new ToDoList(toDoListTarget);
    }
    addToDoItem(itemTitle){
        this.$todoList.addItem(itemTitle);
    }
}

const app = new App();