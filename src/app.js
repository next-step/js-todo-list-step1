import NewTodoTitle from './components/NewTodoTitle.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import Filters from './components/Filters.js';

class TodoApp {
    state;
    components;
    $target;

    constructor () {
        this.state = {
            todoItems: [],
        };
        this.$target = {
            newTodoTitle: document.getElementById('new-todo-title'),
            todoList: document.getElementById('todo-list'),
            todoCount: document.getElementsByClassName('todo-count'),
            filters: document.getElementsByClassName('filters'),
        };

        this.initComponents();
    }

    initComponents() {
        const { input, todoList, todoCount, filters} = this.$target;
        this.components = {
            TodoInput: new NewTodoTitle(input, {}),
            TodoList: new TodoList(todoList, {}),
            TodoCount: new TodoCount(todoCount, {}),
            Filters: new Filters(filters, {}),
        };
    }

    setState (payload) {
        for (const key in payload)
            this.state[key] = payload[key];

        this.render();
    };

    render() {
        const {components} = this;
        for (const key in components)
            components[key].render();
    }
}

new TodoApp();



