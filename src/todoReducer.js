import TodoInput from './todoInput.js';
import TodoList from './TodoList.js';
import Filters from './filters.js';

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
