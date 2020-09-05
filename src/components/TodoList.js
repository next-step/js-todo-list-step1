import TodoItem from './TodoItem.js';
import { deleteItem, setItem } from '../store.js';

const TodoList = ($target) => {
    const toggleComplete = (index, payload) => setItem(index, payload);
    const toggleEditingItem = (index, payload) => setItem(index, payload);
    const editItem = (index, payload) => setItem(index, payload);

    $target.addEventListener('click', ({ target }) => {
        const index = target.parentNode.dataset.index;
        if (target.classList.contains('toggle'))
            return toggleComplete(index, { complete: target.checked });
        if (target.classList.contains('destroy'))
            return deleteItem(index);
    });

    $target.addEventListener('dblclick', ({ target }) => {
        const index = target.parentNode.dataset.index;
        target.classList.contains('label') &&
        toggleEditingItem(index, { editing: true });
    });

    $target.addEventListener('keydown', ({ target, key }) => {
        const index = target.parentNode.dataset.index;
        if (!target.classList.contains('edit')) return;
        if (key === 'Escape')
            return toggleEditingItem(index, { editing: false });
        if (key === 'Enter')
            return editItem(index, { contents: target.value, editing: false });
    });


    return ({ todoItems }) =>
        todoItems?.map((item, index) => TodoItem({ ...item, index })).join('') || '';
};

export default TodoList;
