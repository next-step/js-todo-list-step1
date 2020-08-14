import {LOCAL_VALUE, TARGET_COMPONENT, HASH_LOCATION, TODO_TAB_STATUS} from "../utils/constant.js";

import TodoHeader from "./TodoHeader.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoTab from "./TodoTab.js";

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
                editTodo: this.editTodo.bind(this),
            });

            this.todoTab = new TodoTab({
                $target: document.querySelector(TARGET_COMPONENT.TODO_TAB),
                selectTodoTab: this.selectTodoTab.bind(this),
            });

        } catch (e) {
            console.error(e.error);
        }
    }

    selectTodoTab(selectedHash) {
        if (selectedHash === HASH_LOCATION.ALL) {
            this.getFilteredTodos(TODO_TAB_STATUS.ALL);
            return;
        }

        if (selectedHash === HASH_LOCATION.ACTIVE) {
            this.getFilteredTodos(TODO_TAB_STATUS.TODO);
            return;
        }

        if (selectedHash === HASH_LOCATION.COMPLETED) {
            this.getFilteredTodos(TODO_TAB_STATUS.DONE);
        }
    }

    getFilteredTodos(filterType) {
        if (filterType === TODO_TAB_STATUS.ALL) {
            this.todoList.setState(this.todos);
            return;
        }

        if (filterType === TODO_TAB_STATUS.DONE) {
            this.todoList.setState(this.todos.filter(todo => todo.isCompleted));
            return;
        }

        if (filterType === TODO_TAB_STATUS.TODO) {
            this.todoList.setState(this.todos.filter(todo => !todo.isCompleted));
        }
    }

    editTodo(targetId, context) {
        const changedTodos = this.todos.map(todo => {
            if (todo.id !== targetId) {
                return todo;
            }

            return {
                ...todo,
                title: context,
            }
        });

        this.setState(changedTodos);
    }

    toggleTodo(targetId) {
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
