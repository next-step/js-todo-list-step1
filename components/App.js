import {LOCAL_VALUE, TARGET_COMPONENT} from "../utils/constant.js";

import TodoHeader from "./TodoHeader.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";

class App {
    constructor() {
        try {
            this.todos = this.getTodos();

            this.todoHeader = new TodoHeader({
                    $target: document.querySelector(TARGET_COMPONENT.TODO_HEADER)
                }
            );

            this.todoInput = new TodoInput({
                $target: document.querySelector(TARGET_COMPONENT.TODO_INPUT),
                addTodoItem: this.addTodoItem.bind(this)
            });

            this.todoList = new TodoList({
                $target: document.querySelector(TARGET_COMPONENT.TODO_LIST),
                todos: this.todos,
            });

        } catch (e) {
            console.error(e.error);
        }
    }

    getTodos() {
        const todos = localStorage.getItem(LOCAL_VALUE.TODOS);
        return JSON.parse(todos) || [];
    }

    setState(todos) {
        this.todos = todos;
        this.saveTodos(todos);
        this.todoList.setState(todos);
    }

    saveTodos(todos) {
        localStorage.setItem(LOCAL_VALUE.TODOS, JSON.stringify(todos));
    }

    addTodoItem(todo) {
        this.setState([...this.todos, todo]);
    };
}

export default App;
