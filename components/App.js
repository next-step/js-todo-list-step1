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
                removeTodo: this.removeTodo.bind(this),
                toggleTodo: this.toggleTodo.bind(this),
            });

        } catch (e) {
            console.error(e.error);
        }
    }

    toggleTodo(targetId) {
        console.table(this.todos);

        const changedTodos = this.todos.map(todo => {
            if (todo.id !== targetId) {
                return todo;
            }

            return {
                ...todo,
                isCompleted: !todo.isCompleted
            };
        });

        this.setState(changedTodos);
    }

    removeTodo(targetId) {
        const removedTodos = this.todos.filter((todo) => todo.id !== targetId);

        this.setState(removedTodos);
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
