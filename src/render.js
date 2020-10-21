import TodoList from './components/TodoList.js';
import TodoFilters from './components/TodoFilters.js';
import { $todoList, $todoCount, $todoFilters } from './dom.js';


export const initRender = ({ todoItems, filter }) => {
    render({ todoItems, filter });
};

export const render = ({ todoItems, filter }) => {
    $todoFilters.innerHTML = TodoFilters({ filter });
    $todoList.innerHTML = TodoList({ todoItems });
    $todoCount.innerHTML = todoItems.length;
};

