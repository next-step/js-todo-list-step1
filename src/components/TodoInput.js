export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector('#new-todo-title');

  $todoInput.addEventListener('keydown', (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    if (event.key !== 'Enter') return;

    const todoInputTarget = event.target;
    if (todoInputTarget.value === '') return;

    onAdd(todoInputTarget.value);
    todoInputTarget.value = '';
  };
}
