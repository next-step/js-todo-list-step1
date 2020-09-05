import NewTodoTitle from './components/NewTodoTitle.js';
import TodoList from './components/TodoList.js';
import Filters from './components/Filters.js';

const $newTodoTitle = document.getElementById('new-todo-title');
const $todoList = document.getElementById('todo-list');
const $todoCount = document.querySelector('.todo-count strong');
const $filters = document.querySelector('.filters');

const components = {};

const initComponents = () => {
    components.NewTodoTitle = NewTodoTitle($newTodoTitle);
    components.TodoList = TodoList($todoList);
    components.Filters = Filters($filters);
};

export const initRender = ({ todoItems, filter }) => {
    initComponents();
    $filters.querySelector(`.${ filter }`).classList.add('selected');

    $todoList.innerHTML = components.TodoList({ todoItems });
    $todoCount.innerHTML = todoItems.length;
};


export const render = ({ todoItems }) => {
    $todoList.innerHTML = components.TodoList({ todoItems });
    $todoCount.innerHTML = todoItems.length;
};

