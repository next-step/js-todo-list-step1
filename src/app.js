import Store from './store.js';
import TodoApp from './todoApp.js';

(function () {
    const store = new Store();
    const todoApp = new TodoApp(store);

    todoApp.run();
})();
