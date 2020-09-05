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

    setEvent() {
        const { $target, toggleComplete, deleteItem } = this;

        $target.addEventListener('click', ({ target }) => {
            const index = target.parentNode.dataset.index;
            if (target.classList.contains('toggle')) {
                toggleComplete(index);
                return;
            }
            else if (target.classList.contains('destroy')) {
                deleteItem(index);
                return;
            }
        });

    }

    render (todoItems) {
        const { $target } = this;

        $target.innerHTML = todoItems.map(({ contents, complete }, index) => `
        <li class="view ${complete && 'completed'}" data-index="${index}">
            <input class="toggle" type="checkbox" ${ complete && 'checked' }/>
            <label class="label">${ contents }</label>
            <button class="destroy"></button>
        </li>
        `).join('');
    }
}

export default TodoList;