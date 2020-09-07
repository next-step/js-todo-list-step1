import TodoItem from './TodoItem.js';

export default function TodoList({onHandleToggle, onEdit, onDelete, saveTodoItems}) {
    const $todoList = document.getElementById('todo-list');

    this.setState = items => {
        this.todoItems = items;
        this.render();
    };

    this.onClickHandler = e => {
        const $liId = e.target.closest('li').getAttribute('id');
        const $itemId = $liId.split('-')[1];

        const $className = e.target.className;
        switch ($className) {
            case 'toggle':
                onHandleToggle($itemId);
                break;
            case 'destroy':
                onDelete($itemId);
                break;
            default:
                break;
        }
    };

    this.onDoubleClickHandler = e => {
        const $liId = e.target.closest('li').getAttribute('id');
        const $itemId = $liId.split('-')[1];

        if(e.target.className === 'label') {
            onEdit($itemId, true);
        }
    };

    this.onKeydownHandler = e => {
        if(e.target.className === 'edit') {
            const $liId = e.target.closest('li').getAttribute('id');
            const $itemId = $liId.split('-')[1];
            const $context = e.target.value;

            const $key = e.key;
            switch ($key) {
                case 'Enter':
                    saveTodoItems($itemId, $context);
                    break;
                case 'Escape':
                    onEdit($itemId, false);
                    break;
                default:
                    break;
            }
        }
    };

    this.bindEvent = () => {
        $todoList.addEventListener('click', this.onClickHandler);
        $todoList.addEventListener('dblclick', this.onDoubleClickHandler);
        $todoList.addEventListener('keydown', this.onKeydownHandler);
    };

    this.render = () => {
        const itemList = this.todoItems.map(item => TodoItem(item)).join("");
        $todoList.innerHTML = itemList;
        this.bindEvent();
    };
}