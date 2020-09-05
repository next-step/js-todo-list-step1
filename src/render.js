import NewTodoTitle from './components/NewTodoTitle.js';
import TodoList from './components/TodoList.js';
import Filters from './components/Filters.js';

const $newTodoTitle = document.getElementById('new-todo-title');
const $todoList = document.getElementById('todo-list');
const $todoCount = document.querySelector('.todo-count strong');
const $filters = document.querySelector('.filters');

const components = {};

const initComponents = () => {
    components.NewTodoTitle = new NewTodoTitle($newTodoTitle);
    components.TodoList = new TodoList($todoList);
    components.Filters = new Filters($filters);
};

export const initRender = ({ todoItems, filter }) => {
    initComponents();
    $filters.querySelector(`.${ filter }`).classList.add('selected');

    $todoList.innerHTML = components.TodoList.render({ todoItems });
    $todoCount.innerHTML = todoItems.length;
};


export const render = ({ todoItems }) => {
    $todoList.innerHTML = components.TodoList.render({ todoItems });
    $todoCount.innerHTML = todoItems.length;
};

