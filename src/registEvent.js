import { $newTodoTitle, $todoList, $todoFilters } from './dom.js';
import { deleteItem, getFilter, setFilter, setItem, addItem } from './store.js';

const addEventBubblingListener = ($target, action, className, callback) => {
    $target.addEventListener(action, event => {
        const { target } = event;
        const index = target?.closest('[data-index]')?.dataset?.index;
        target.classList.contains(className) && callback({ index, event });
    });
};

const _addItem = ({ event: { target, key } }) => {
    const contents = target.value;
    if (contents !== '' && key === 'Enter') {
        addItem(contents);
        target.value = '';
    }
};

const filterItem = (event) => {
    event.preventDefault();
    const { target: { dataset } } = event;

    if (getFilter() === dataset) return;
    setFilter(dataset.type);
};

const toggleComplete = ({ index, event: { target: { checked } } }) =>
    setItem(index, { complete: checked });

const editingItem = ({ index }) =>
    setItem(index, { editing: true });

const viewingItem = ({ index, event: { key } }) =>
    key === 'Escape' &&
    setItem(index, { editing: false });

const editItem = ({ index, event: { target, key } }) =>
    key === 'Enter' &&
    setItem(index, {
        contents: target.value,
        editing: false,
    });


addEventBubblingListener($newTodoTitle, 'keypress', 'new-todo', _addItem);

$todoFilters.addEventListener('click', filterItem);

addEventBubblingListener($todoList, 'click', 'toggle', toggleComplete);
addEventBubblingListener($todoList, 'click', 'destroy', deleteItem);
addEventBubblingListener($todoList, 'dblclick', 'label', editingItem);
addEventBubblingListener($todoList, 'keydown', 'edit', event => {
    viewingItem(event);
    editItem(event);
});

