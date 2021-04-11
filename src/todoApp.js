import { todoTemplate } from './template.js';
import { getElement, saveData, loadData, pipe } from './util.js';
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
        this.store.on('todoList', this.viewUpdate.bind(this));
        this.store.on('filter', this.viewUpdate.bind(this));
        this.store.set({
            todoList: loadData() ? loadData() : {},
            filter: FILTER_TYPE.ALL
        });

        new TodoInput(this.store);
        new TodoList(this.store);
        new Filters(this.store);
    }

    getTodoData() {
        const todoList = this.store.get().todoList;
        const filter = this.store.get().filter;

        let onFilteringTodoList = Object.values(todoList);
        if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = Object.values(todoList).filter(item => !item.isCompleted);
        if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = Object.values(todoList).filter(item => item.isCompleted);

        return { todoList, onFilteringTodoList };
    }

    render({ todoList, onFilteringTodoList }) {
        const todoListTemplate = onFilteringTodoList.map(({ title, id, isCompleted, isEditing }) => todoTemplate(title, id, isCompleted, isEditing)).join('');

        this.todoListEl.innerHTML = todoListTemplate;
        this.todoCountEl.innerText = onFilteringTodoList.length;

        return todoList;
    }

    saveTodoData(todoList) {
        saveData(todoList);
    }

    viewUpdate() {
        pipe(
            this.getTodoData.bind(this),
            this.render.bind(this),
            this.saveTodoData.bind(this)
        )();
    }
}

export default TodoApp
