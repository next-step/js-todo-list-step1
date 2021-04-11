import { getElement } from './util.js';
import { FILTER_TYPE, UI_CLASS, KEY_CODE, MESSAGES } from './constant.js';

class TodoAction {
    constructor(store) {
        this.store = store;
        this.inputEl = getElement('input.new-todo');
        this.filtersEl = getElement('ul.filters');
        this.todoListEl = getElement('ul.todo-list');
        this.init();
    }

    init() {
        this.inputEl.addEventListener('keyup', this.addTodoHandler.bind(this));
        this.todoListEl.addEventListener('click', this.todoClickDelegationHandler.bind(this));
        this.todoListEl.addEventListener('dblclick', this.modifyHandler.bind(this));
        this.todoListEl.addEventListener('keyup', this.confirmHandler.bind(this));
        this.filtersEl.addEventListener('click', this.filtersHandler.bind(this));
    }

    addTodoHandler({ keyCode, target }) {
        if (keyCode !== KEY_CODE.ENTER || !target.value) return;
        const todoList = this.store.get().todoList;
        const id = new Date().getTime();
        const newTodo = {
            title: target.value,
            id: id,
            isCompleted: false,
            isEditing: false
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
        if (!confirm(MESSAGES.DELETE)) return;
        const todoList = this.store.get().todoList;
        delete todoList[id];

        this.store.set({
            todoList: { ...todoList }
        });
    }

    todoClickDelegationHandler({ target }) {
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

    confirmHandler({ keyCode, target }) {
        if (keyCode === KEY_CODE.ENTER || keyCode === KEY_CODE.ESCAPE) {
            const { id } = target.closest('li');
            const todoList = this.store.get().todoList;
            if (keyCode === KEY_CODE.ENTER) todoList[id].title = target.value;
            todoList[id].isEditing = false;

            this.store.set({
                todoList: { ...todoList }
            });
        }
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

export default TodoAction
