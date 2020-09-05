import TodoItem from './TodoItem.js';
import { deleteItem, setItem } from '../store.js';

class TodoList {
    $target;

    constructor (target) {
        this.$target = target;
        this.setEvent();
    }

    toggleComplete = (index, payload) => setItem(index, payload);
    toggleEditingItem = (index, payload) => setItem(index, payload);
    editItem = (index, payload) => setItem(index, payload);

    setEvent () {
        const { $target, toggleComplete, toggleEditingItem, editItem } = this;

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

    }

    render = ({ todoItems }) =>
        todoItems?.map(({ contents, complete, editing }, index) =>
            new TodoItem({ index, contents, complete, editing }).render(),
        ).join('') || '';
}

export default TodoList;