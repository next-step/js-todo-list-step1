import TodoItem from './TodoItem.js';
import { deleteItem, setItem } from '../store.js';
import { addEventBubblingListener } from '../utils.js';

const TodoList = ($target) => {
    const toggleComplete = ({ index, event: { target } }) =>
        setItem(index, { complete: target.checked });

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

    addEventBubblingListener($target, 'click', 'toggle', toggleComplete);
    addEventBubblingListener($target, 'click', 'destroy', deleteItem);
    addEventBubblingListener($target, 'dblclick', 'label', editingItem);
    addEventBubblingListener($target, 'keydown', 'edit', event => {
        viewingItem(event); editItem(event);
    });

    return ({ todoItems }) =>
        todoItems?.map((item, index) => TodoItem({ ...item, index })).join('') || '';
};

export default TodoList;
