import {LOCAL_VALUE, TARGET_COMPONENT, HASH_LOCATION, TODO_TAB_STATUS} from "../utils/constant.js";

import TodoHeader from "./TodoHeader.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoTab from "./TodoTab.js";
import TodoCounter from "./TodoCounter.js";

class App {
    constructor() {
        try {
            this.state = {
                todos: this.getTodos(),
                selectedTab: TODO_TAB_STATUS.DEFAULT_SELECTED_ALL,
            }

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
                todoListState: this.state,
                removeTodo: this.removeTodo.bind(this),
                toggleTodo: this.toggleTodo.bind(this),
                editTodo: this.editTodo.bind(this),
            });

            this.todoTab = new TodoTab({
                $target: document.querySelector(TARGET_COMPONENT.TODO_TAB),
                selectedTab: this.state.selectedTab,
                selectTodoTab: this.selectTodoTab.bind(this),
            });

            this.todoCounter = new TodoCounter({
                $target: document.querySelector(TARGET_COMPONENT.TODO_COUNTER),
                todoCounterState: this.state,
            });

        } catch (e) {
            console.error(e.error);
        }
    }

    selectTodoTab(clickedTab) {
        const changedState = {
            ...this.state,
            selectedTab: clickedTab,
        };

        this.setState(changedState);
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
        const changedTodos = this.state.todos.map(todo => {
            if (todo.id !== targetId) {
                return todo;
            }

            return {
                ...todo,
                isCompleted: !todo.isCompleted
            };
        });

        this.setState({
            ...this.state,
            todos: changedTodos,
        });
    }

    removeTodo(targetId) {
        const removedTodos = this.state.todos.filter((todo) => todo.id !== targetId);

        this.setState({
            ...this.state,
            todos: removedTodos,
        });
    }

    getTodos() {
        const todos = localStorage.getItem(LOCAL_VALUE.TODOS);
        return JSON.parse(todos) || [];
    }

    setState(changedState) {
        this.state = changedState;
        this.saveTodos(changedState);
        this.todoList.setState(changedState);
        this.todoTab.setState(changedState.selectedTab);
        this.todoCounter.setState(changedState);
    }

    saveTodos(state) {
        localStorage.setItem(LOCAL_VALUE.SELECTED_TAB, JSON.stringify(state.selectedTab));
        localStorage.setItem(LOCAL_VALUE.TODOS, JSON.stringify(state.todos));
    }

    addTodoItem(todo) {
        this.setState({
            ...this.state,
            todos: [...this.state.todos, todo],
        })
        ;
    };
}

export default App;
