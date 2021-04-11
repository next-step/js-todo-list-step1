import { todoTemplate } from './template.js';
import { getElement, saveData, loadData } from './util.js';
import { STATE, FILTER_TYPE, UI_CLASS } from './constant.js';

class TodoApp {
    constructor(store) {
        this.store = store;
        this.inputEl = getElement('input.new-todo');
        this.filtersEl = getElement('ul.filters');
        this.todoListEl = getElement('ul.todo-list');
        this.todoCountEl = getElement('span.todo-count strong');
    }

    storeInit() {
        this.store.on(STATE.TODO_LIST, () => {
            const todoList = Object.values(this.store.get().todoList);
            const todoListTemplate = todoList.map(({ title, id, isCompleted, isEditing }) => todoTemplate(title, id, isCompleted, isEditing)).join('');

            this.todoListEl.innerHTML = todoListTemplate;
            this.todoCountEl.innerText = todoList.length;
            saveData(this.store.get().todoList);
        });

        this.store.on(STATE.FILTER, () => {
            const filter = this.store.get().filter;

            let filterTodoList;
            if (filter === FILTER_TYPE.ALL) filterTodoList = Object.values(this.store.get().todoList);
            else if (filter === FILTER_TYPE.ACTIVE) filterTodoList = Object.values(this.store.get().todoList).filter(item => !item.isCompleted);
            else if (filter === FILTER_TYPE.COMPLETED) filterTodoList = Object.values(this.store.get().todoList).filter(item => item.isCompleted);

            const filterTodoListTemplate = filterTodoList.map(({ title, id, isCompleted, isEditing }) => todoTemplate(title, id, isCompleted, isEditing)).join('');

            this.todoListEl.innerHTML = filterTodoListTemplate;
            this.todoCountEl.innerText = filterTodoList.length;
        });

        this.store.set({
            todoList: loadData() ? loadData() : {},
            filter: FILTER_TYPE.ALL
        });
    }

    appInit() {
        this.inputEl.addEventListener('keyup', this.addTodoHandler.bind(this));
        this.todoListEl.addEventListener('click', this.todoClickHandler.bind(this));
        this.todoListEl.addEventListener('dblclick', this.modifyHandler.bind(this));
        this.todoListEl.addEventListener('keyup', this.confirmHandler.bind(this));
        this.filtersEl.addEventListener('click', this.filtersHandler.bind(this));
    }

    run() {
        this.storeInit();
        this.appInit();
    }

    addTodoHandler({ key, target }) {
        if (key !== 'Enter' || !target.value) return;

        const todoList = this.store.get().todoList;
        const id = new Date().getTime();
        const newTodo = {
            title: target.value,
            id: id,
            isCompleted: false,
            isEditing: false,
        };
        todoList[id] = newTodo;
        target.value = '';

        this.store.set({
            todoList: { ...todoList }
        });
    }

    _toggleTodoItem({ id }) {
        const todoList = this.store.get().todoList;
        todoList[id].isCompleted = !todoList[id].isCompleted;

        this.store.set({
            todoList: { ...todoList }
        });
    }

    _destroyTodoItem({ id }) {
        const todoList = this.store.get().todoList;
        delete todoList[id];

        this.store.set({
            todoList: { ...todoList }
        });
    }

    todoClickHandler({ target }) {
        if (target.classList.contains(UI_CLASS.TOGGLE)) return this._toggleTodoItem(target);
        if (target.classList.contains(UI_CLASS.DESTROY)) return this._destroyTodoItem(target);
    }

    modifyHandler({ target }) {
        if (!target.classList.contains(UI_CLASS.LABEL)) return;

        const { id } = target.closest('li');
        const todoList = this.store.get().todoList;
        todoList[id].isEditing = true;

        this.store.set({
            todoList: { ...todoList }
        });
    }

    confirmHandler({ key, target }) {
        if (key !== 'Enter' || !target.value) return;

        const { id } = target.closest('li');
        const todoList = this.store.get().todoList;
        todoList[id].title = target.value;
        todoList[id].isEditing = false;

        this.store.set({
            todoList: { ...todoList }
        });
    }

    filtersHandler({ target }) {
        if (target.tagName !== 'A') return;
        const type = target.classList[0];

        this.filtersEl.querySelectorAll('a').forEach(el => {
            el.classList.remove(UI_CLASS.SELECTED);
            if (el.classList.contains(type)) el.classList.add(UI_CLASS.SELECTED);
        });

        this.store.set({
            filter: FILTER_TYPE[type.toUpperCase()]
        });
    }
}

export default TodoApp
