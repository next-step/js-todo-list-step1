import NewTodoTitle from './components/NewTodoTitle.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import Filters from './components/Filters.js';

class TodoApp {
    state;
    components;

    constructor () {
        this.state = {
            todoItems: [],
        };
        this.initComponents();
    }

    initComponents() {
        const { onAdd } = this;

        const newTodoTitle = document.getElementById('new-todo-title');
        const todoList = document.getElementById('todo-list');
        const todoCount = document.getElementsByClassName('todo-count');
        const filters = document.getElementsByClassName('filters');

        this.components = {
            TodoInput: new NewTodoTitle(newTodoTitle, { onAdd }),
            TodoList: new TodoList(todoList, {}),
            TodoCount: new TodoCount(todoCount, {}),
            Filters: new Filters(filters, {}),
        };
    }

    onAdd = (contents) => {
        const { todoItems } = this.state;

        const newTodoItems = [
            ...todoItems,
            { contents }
        ];
        this.setState({ todoItems: newTodoItems})
    };

    setState (payload) {
        for (const key in payload)
            this.state[key] = payload[key];

        this.render();
    };

    render() {
        const {components} = this;
        for (const key in components)
            components[key].render?.();
    }
}

new TodoApp();



