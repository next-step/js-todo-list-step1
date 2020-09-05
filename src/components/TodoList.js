import TodoItem from './TodoItem.js';
import { deleteItem, setItem } from '../store.js';

const TodoList = ($target) => {
    const toggleComplete = (index, payload) => setItem(index, payload);
    const toggleEditingItem = (index, payload) => setItem(index, payload);
    const editItem = (index, payload) => setItem(index, payload);

    $target.addEventListener('click', ({ target }) => {
        const index = target.parentNode.dataset.index;
        if (target.classList.contains('toggle')) {
            toggleComplete(index, { complete: target.checked });
            return;
        } else if (target.classList.contains('destroy')) {
            deleteItem(index);
            return;
        }
    });

    $target.addEventListener('dblclick', ({ target }) => {
        const index = target.parentNode.dataset.index;
        target.classList.contains('label') &&
        toggleEditingItem(index, { editing: true });
    });

    $target.addEventListener('keydown', ({ target, key }) => {
        const index = target.parentNode.dataset.index;
        if (target.classList.contains('edit'))
            if (key === 'Escape')
                toggleEditingItem(index, { editing: false });
            else if (key === 'Enter')
                editItem(index, { contents: target.value, editing: false });
    });


    return ({ todoItems }) =>
        todoItems?.map(({ contents, complete, editing }, index) =>
            TodoItem({ index, contents, complete, editing }),
        ).join('') || '';
};

export default TodoList;
