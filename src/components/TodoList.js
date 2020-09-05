class TodoList {
    $target;
    props;

    constructor (target, props) {
        this.$target = target;
        this.props = props;
        this.setEvent();
    }

    toggleComplete = (index) => this.props.toggleComplete(index);

    setEvent() {
        const { $target, toggleComplete } = this;

        $target.addEventListener('change', ({ target }) => {
            toggleComplete(target.parentNode.dataset.index)
        })
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