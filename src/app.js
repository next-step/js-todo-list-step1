import { store, getItems } from './store.js';
import { initRender } from './render.js';

const TodoApp = () => {
    initRender({ todoItems: getItems(), filter: store.filter });
};

TodoApp();



