import { todoItemTemplate } from '../templates.js';

function TodoList() {
  this.render = (items) => {
    const listElement = document.getElementById('todo-list');
    const makeTodoList = items.map((item) => todoItemTemplate(item));

    listElement.innerHTML = makeTodoList.join('');
  };
}

export default TodoList;
