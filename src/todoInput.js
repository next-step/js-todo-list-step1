import { getElement } from './util.js';
import { KEY_CODE } from './constant.js';

class TodoInput {
    constructor(store) {
        this.store = store;
        this.inputEl = getElement('input.new-todo');
        this.init();
    }

    init() {
        this.inputEl.addEventListener('keyup', this.addTodoHandler.bind(this));
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
}

export default TodoInput
