import Store from './store.js';
import TodoAction from './todoAction.js';
import TodoRender from './todoRender.js';

(function () {
    const store = new Store();

    new TodoAction(store);
    new TodoRender(store);
})();
