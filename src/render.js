import TodoList from './components/TodoList.js';
import TodoFilters from './components/TodoFilters.js';
import { $todoList, $todoCount, $todoFilters } from './dom.js';


const components = {};

const initComponents = () => {
    components.TodoList = TodoList();
    components.TodoFilters = TodoFilters();
};

export const initRender = ({ todoItems, filter }) => {
    initComponents();
    render({ todoItems, filter });
};

export const render = ({ todoItems, filter }) => {
    $todoFilters.innerHTML = components.TodoFilters(filter);
    $todoList.innerHTML = components.TodoList({ todoItems });
    $todoCount.innerHTML = todoItems.length;
};

