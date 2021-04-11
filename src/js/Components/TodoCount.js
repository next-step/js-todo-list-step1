import { todoCountTemplate } from '../templates.js';

function TodoCount() {
  const countElement = document.getElementById('todo-count');

  this.render = (total = 0) => {
    console.log(todoCountTemplate(total));
    countElement.innerHTML = todoCountTemplate(total);
  };
}

export default TodoCount;
