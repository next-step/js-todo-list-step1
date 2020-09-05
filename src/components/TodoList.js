class TodoList {
    $target;
    props;

    constructor (target, props) {
        this.$target = target;
        this.props = props;
    }

    render (todoItems) {
        const { $target } = this;
        $target.innerHTML = todoItems.map(({ contents }) => `
        <li class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${ contents }</label>
            <button class="destroy"></button>
        </li>
        `).join('');

    }
}

export default TodoList;