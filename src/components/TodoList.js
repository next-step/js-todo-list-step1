import TodoItem from './TodoItem.js';

class TodoList {
    $target;
    props;

    constructor (target, props) {
        this.$target = target;
        this.props = props;
        this.setEvent();
    }

    toggleComplete = (index, payload) => this.props.setItem(index, payload);
    deleteItem = (index) => this.props.deleteItem(index);
    toggleEditingItem = (index, payload) => this.props.setItem(index, payload);
    editItem = (index, payload) => this.props.setItem(index, payload);

    setEvent () {
        const { $target, toggleComplete, deleteItem, toggleEditingItem, editItem } = this;

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

    render ({ todoItems, filter }) {
        const { $target } = this;

        $target.innerHTML = todoItems.map(({ contents, complete, editing }, index) =>
            new TodoItem({ index, contents, complete, editing }).render(filter),
        ).join('');
    }
}

export default TodoList;