import TodoItem from './TodoItem.js';

class TodoList {
    $target;
    props;

    constructor (target, props) {
        this.$target = target;
        this.props = props;
        this.setEvent();
    }

    toggleComplete = (index) => this.props.toggleComplete(index);
    deleteItem = (index) => this.props.deleteItem(index);
    toggleEditingItem = (index) => this.props.toggleEditingItem(index);
    editItem = (index, payload) => this.props.setItem(index, payload);

    setEvent () {
        const { $target, toggleComplete, deleteItem, toggleEditingItem, editItem } = this;

        $target.addEventListener('click', ({ target }) => {
            const index = target.parentNode.dataset.index;
            if (target.classList.contains('toggle')) {
                toggleComplete(index);
                return;
            } else if (target.classList.contains('destroy')) {
                deleteItem(index);
                return;
            }
        });
        $target.addEventListener('dblclick', ({ target }) => {
            const index = target.parentNode.dataset.index;
            if (target.classList.contains('label')) {
                toggleEditingItem(index);
            }
        });
        $target.addEventListener('keydown', ({ target, key }) => {
            const index = target.parentNode.dataset.index;
            if (target.classList.contains('edit')) {
                if (key === 'Escape') toggleEditingItem(index);
                if (key === 'Enter') editItem(index, { contents: target.value, editing: false });
            }
        });

    }

    render (todoItems) {
        const { $target } = this;

        $target.innerHTML = todoItems.map(({ contents, complete, editing }, index) =>
            new TodoItem({ index, contents, complete, editing }).render(),
        ).join('');
    }
}

export default TodoList;