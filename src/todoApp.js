import { todoTemplate } from './template.js';
import { getElement, saveData, loadData } from './util.js';
import { FILTER_TYPE } from './constant.js';

import TodoInput from './todoInput.js';
import TodoList from './TodoList.js';
import Filters from './filters.js';

class TodoApp {
    constructor(store) {
        this.store = store;
        this.todoListEl = getElement('ul.todo-list');
        this.todoCountEl = getElement('span.todo-count strong');
        this.init();
    }

    init() {
        this.store.on('todoList', this.render.bind(this));
        this.store.on('filter', this.render.bind(this));
        this.store.set({
            todoList: loadData() ? loadData() : {},
            filter: FILTER_TYPE.ALL
        });

        new TodoInput(this.store);
        new TodoList(this.store);
        new Filters(this.store);
    }

    render() {
        const todoList = this.store.get().todoList;
        const filter = this.store.get().filter;

        let onFilterTodoList = Object.values(todoList);
        if (filter === FILTER_TYPE.ACTIVE) onFilterTodoList = Object.values(todoList).filter(item => !item.isCompleted);
        if (filter === FILTER_TYPE.COMPLETED) onFilterTodoList = Object.values(todoList).filter(item => item.isCompleted);

        const todoListTemplate = onFilterTodoList.map(({ title, id, isCompleted, isEditing }) => todoTemplate(title, id, isCompleted, isEditing)).join('');

        this.todoListEl.innerHTML = todoListTemplate;
        this.todoCountEl.innerText = onFilterTodoList.length;

        saveData(todoList);
    }
}

export default TodoApp
