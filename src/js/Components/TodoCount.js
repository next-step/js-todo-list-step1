import { todoCountTemplate } from '../templates.js';

function TodoCount() {
  const countElement = document.getElementById('todo-count');

  this.render = (total = 0) => {
    countElement.innerHTML = todoCountTemplate(total);
  };
}

export default TodoCount;
