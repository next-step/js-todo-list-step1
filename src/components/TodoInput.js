// 입력받는 컴포넌트
export default function TodoInput() {
  const todoInput = document.querySelector('#new-todo-title');

  todoInput.addEventListener('keydown', (event) => this.handleOnAdd(event));

  this.setEventListener = (onAdd) => {
    this.onAdd = onAdd;
  };

  this.handleOnAdd = (event) => {
    if (event.key === 'Enter') {
      const newTodoTarget = event.target;
      this.onAdd && this.onAdd(newTodoTarget.value);
      newTodoTarget.value = '';
    }
  };
}
