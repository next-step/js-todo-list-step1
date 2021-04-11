import Store from './store.js';
import { newTodoTemplate } from './template.js';
import { getElement, saveData, loadData } from './util.js';
import { FILTER_TYPE } from './constant.js';

// store
const store = new Store({
    filter: FILTER_TYPE.ALL,
    todoList: {},
});

store.on('filter', () => {
    const filter = store.get().filter;

    let filterTodoList;
    if (filter === FILTER_TYPE.ALL) filterTodoList = Object.values(store.get().todoList);
    else if (filter === FILTER_TYPE.ACTIVE) filterTodoList = Object.values(store.get().todoList).filter(item => !item.isCompleted);
    else if (filter === FILTER_TYPE.COMPLETED) filterTodoList = Object.values(store.get().todoList).filter(item => item.isCompleted);

    const filterTodoListTemplate = filterTodoList.map(({ title, id, isCompleted, isEditing }) => newTodoTemplate(title, id, isCompleted, isEditing)).join('');

    todoListEl.innerHTML = filterTodoListTemplate;
    todoCountEl.innerText = filterTodoList.length;
});

store.on('todoList', () => {
    const todoList = Object.values(store.get().todoList);
    const todoListTemplate = todoList.map(({ title, id, isCompleted, isEditing }) => newTodoTemplate(title, id, isCompleted, isEditing)).join('');

    todoListEl.innerHTML = todoListTemplate;
    todoCountEl.innerText = todoList.length;
    saveData(store.get().todoList);
});

store.set({
    todoList: loadData() ? loadData() : {}
});

// todoapp
const inputEl = getElement('input.new-todo');
const filtersEl = getElement('ul.filters');
const todoListEl = getElement('ul.todo-list');
const todoCountEl = getElement('span.todo-count strong');

const addTodoHandler = ({ key, target }) => {
    if (key !== 'Enter' || !target.value) return;

    const todoList = store.get().todoList;
    const id = new Date().getTime();
    const newTodo = {
        title: target.value,
        id: id,
        isCompleted: false,
        isEditing: false,
    };
    todoList[id] = newTodo;
    target.value = '';

    store.set({
        todoList: { ...todoList }
    });
};

const toggleTodoItem = ({ id }) => {
    const todoList = store.get().todoList;
    todoList[id].isCompleted = !todoList[id].isCompleted;

    store.set({
        todoList: { ...todoList }
    });
};

const destroyTodoItem = ({ id }) => {
    const todoList = store.get().todoList;
    delete todoList[id];

    store.set({
        todoList: { ...todoList }
    });
};

const todoClickHandler = ({ target }) => {
    if (target.classList.contains('toggle')) return toggleTodoItem(target);
    if (target.classList.contains('destroy')) return destroyTodoItem(target);
};

const modifyHandler = ({ target }) => {
    if (!target.classList.contains('label')) return;

    const { id } = target.closest('li');
    const todoList = store.get().todoList;
    todoList[id].isEditing = true;

    store.set({
        todoList: { ...todoList }
    });
};

const confirmHandler = ({ key, target }) => {
    if (key !== 'Enter' || !target.value) return;

    const { id } = target.closest('li');
    const todoList = store.get().todoList;
    todoList[id].title = target.value;
    todoList[id].isEditing = false;

    store.set({
        todoList: { ...todoList }
    });
};

const filtersHandler = ({ target }) => {
    if (target.tagName !== 'A') return;
    const type = target.classList[0];

    filtersEl.querySelectorAll('a').forEach(el => {
        el.classList.remove('selected');
        if (el.classList.contains(type)) el.classList.add('selected');
    })

    store.set({
        filter: FILTER_TYPE[type.toUpperCase()]
    });
};

inputEl.addEventListener('keyup', addTodoHandler);
todoListEl.addEventListener('click', todoClickHandler);
todoListEl.addEventListener('dblclick', modifyHandler);
todoListEl.addEventListener('keyup', confirmHandler);
filtersEl.addEventListener('click', filtersHandler);
