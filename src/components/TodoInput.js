export default class TodoInput {
  setEvent({onAdd}){
    const todoInput = document.querySelector('#new-todo-title');
    todoInput.addEventListener('keydown', event => this.addTodoItem(event, onAdd));
  }
  addTodoItem(event, onAdd) {
    const $newTodoTarget = event.target;
    if (event.key === 'Enter') {
      if ($newTodoTarget.value === '') return alert('할일을 입력하세여.');
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = '';
    }
  }
}
