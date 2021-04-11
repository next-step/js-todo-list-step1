import Store from './store.js';
import { newTodoTemplate } from './template.js';
import { getElement } from './util.js';
import { FILTER_TYPE } from './constant.js';

// store
const store = new Store({
    filter: FILTER_TYPE.ALL,
    todoList: [],
});

store.on('filter', () => {
    const filter = store.get().filter;
    let filterTodoList;

    switch (filter) {
        case FILTER_TYPE.ACTIVE:
            filterTodoList = store.get().todoList.filter(item => !item.isCompleted);
            break;
        case FILTER_TYPE.COMPLETED:
            filterTodoList = store.get().todoList.filter(item => item.isCompleted);
            break;
        default:
            filterTodoList = store.get().todoList;
    }

    const filterTodoListTemplate = filterTodoList.map(({ title, id, isCompleted, isEditing }) => newTodoTemplate(title, id, isCompleted, isEditing)).join('');

    todoListEl.innerHTML = filterTodoListTemplate;
    todoCountEl.innerText = filterTodoList.length;
});

store.on('todoList', () => {
    const todoList = store.get().todoList;
    const todoListTemplate = todoList.map(({ title, id, isCompleted, isEditing }) => newTodoTemplate(title, id, isCompleted, isEditing)).join('');

    todoListEl.innerHTML = todoListTemplate;
    todoCountEl.innerText = todoList.length;
});

// todoapp
const newTodoInputEl = getElement('input.new-todo');
const filtersEl = getElement('ul.filters');
const todoListEl = getElement('ul.todo-list');
const todoCountEl = getElement('span.todo-count strong');

const newTodoInputElKeyHandler = ({ key, target }) => {
    if (key !== 'Enter' || !target.value) return;
    if (target.value.match(/<script>/)) return target.value = '';

    const todoList = store.get().todoList;
    const newTodo = {
        title: target.value,
        id: new Date().getTime(),
        isCompleted: false,
        isEditing: false,
    };

    store.set({
        todoList: [...todoList, newTodo]
    });

    target.value = '';
};

const toggleClickHandler = ({ id }) => {
    const todoList = store.get().todoList;
    const updateTodoList = todoList.map(item => {
        if (item.id !== +id) return item;
        return {
            ...item,
            isCompleted: !item.isCompleted
        }
    });

    store.set({
        todoList: updateTodoList
    });
};

const destroyClickHandler = ({ id }) => {
    const todoList = store.get().todoList;
    const updateTodoList = todoList.filter(item => item.id !== +id);

    store.set({
        todoList: updateTodoList
    });
};

const todoListElClickHandler = ({ target }) => {
    if (target.classList.contains('toggle')) return toggleClickHandler(target);
    if (target.classList.contains('destroy')) return destroyClickHandler(target);
};

const todoListElDblClickHandler = ({ target }) => {
    if (!target.classList.contains('label')) return;

    const { id } = target.closest('li');
    const todoList = store.get().todoList;
    const updateTodoList = todoList.map(item => {
        if (item.id !== +id) return item;
        return {
            ...item,
            isEditing: true
        }
    });

    store.set({
        todoList: updateTodoList
    });
};

const todoListElKeyHandler = ({ key, target }) => {
    if (key !== 'Enter' || !target.value) return;

    const { id } = target.closest('li');
    const todoList = store.get().todoList;
    const updateTodoList = todoList.map(item => {
        item.isEditing = false;
        if (item.id !== +id) return item;
        return {
            ...item,
            title: target.value
        }
    });

    store.set({
        todoList: updateTodoList
    });
};

const filtersElClickHandler = ({ target }) => {
    if (target.tagName !== 'A') return;
    const type = target.classList[0];

    filtersEl.querySelectorAll('a').forEach(el => {
        el.classList.remove('selected');
        if (el.classList.contains(type)) el.classList.add('selected');
    })

    store.set({
        filter: FILTER_TYPE[type.toUpperCase()]
    });
}

newTodoInputEl.addEventListener('keyup', newTodoInputElKeyHandler);
todoListEl.addEventListener('click', todoListElClickHandler);
todoListEl.addEventListener('dblclick', todoListElDblClickHandler);
todoListEl.addEventListener('keyup', todoListElKeyHandler);
filtersEl.addEventListener('click', filtersElClickHandler);
