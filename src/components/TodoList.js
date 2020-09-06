import TodoItem from './TodoItem.js';
import { deleteItem, setItem } from '../store.js';
import { addEventListener } from '../utils.js';

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

    addEventListener($target, 'click', 'toggle', toggleComplete);
    addEventListener($target, 'click', 'destroy', deleteItem);
    addEventListener($target, 'dblclick', 'label', editingItem);
    addEventListener($target, 'keydown', 'edit', viewingItem);
    addEventListener($target, 'keydown', 'edit', editItem);

    return ({ todoItems }) =>
        todoItems?.map((item, index) => TodoItem({ ...item, index })).join('') || '';
};

export default TodoList;
