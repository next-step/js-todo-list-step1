import { store, getItems } from './store.js';
import { initRender } from './render.js';

class TodoApp {
    state;

    constructor () {
        this.state = store;
        initRender({ todoItems: getItems(), filter: store.filter });
    }
}

new TodoApp();



