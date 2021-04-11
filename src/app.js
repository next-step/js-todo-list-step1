import Store from './store.js';
import TodoApp from './todoApp.js';

(function () {
    const store = new Store();
    new TodoApp(store);
})();
