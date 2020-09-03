import TodoItem from './TodoItem.js';

export default function TodoList({onHandleToggle, onCheck}) {
    const $todoList = document.getElementById('todo-list');

    this.render = items => {
        const itemList = items.map(item => TodoItem(item));
        $todoList.innerHTML = itemList;
        this.bindEvent();
    };

    this.bindEvent = () => {
        const $todoItemLi = document.querySelectorAll('ul.todo-list>li');
        $todoItemLi.forEach(li => {
            li.addEventListener('click', function (e) {
                const $liId = li.getAttribute('id');
                const $itemId = $liId.split('-')[1];
                const $className = e.target.className;

                switch ($className) {
                    case 'toggle':
                        // 완료 체크
                        onHandleToggle($itemId);
                        break;
                    case 'destroy':
                        // TODO
                        break;
                    default:
                        break;
                }
            })
        });
    };
}