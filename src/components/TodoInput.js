// 입력받는 컴포넌트
export default function TodoInput({ onAdd }) {
  const todoInput = document.querySelector('#new-todo-title');

  todoInput.addEventListener('keydown', (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    if (event.key === 'Enter') {
      const newTodoTarget = event.target;
      onAdd(newTodoTarget.value);
      newTodoTarget.value = '';
    }
  };
}
