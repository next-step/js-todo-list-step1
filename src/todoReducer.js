import TodoInput from './actions/todoInput.js';
import TodoList from './actions/TodoList.js';
import Filters from './actions/filters.js';

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
