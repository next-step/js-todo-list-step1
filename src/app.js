import Store from './store.js';
import TodoReducer from './todoReducer.js';
import TodoViewer from './todoViewer.js';

(function () {
    const store = new Store();

    new TodoReducer(store);
    new TodoViewer(store);
})();
