import TodoInput from './components/todoInput.js';
import TodoList from './components/TodoList.js';
import Filters from './components/filters.js';

class TodoReducer {
    constructor(store) {
        this.store = store;
        this.init();
    }

    init() {
        new TodoInput(this.store);
        new TodoList(this.store);
        new Filters(this.store);
    }
}

export default TodoReducer
