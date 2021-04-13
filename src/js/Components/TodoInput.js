const TodoInput = ({ onAdd }) => {
  const inputElement = document.querySelector('#new-todo-title');

  const addTodoItem = (e) => {
    if (e.key === 'Enter') {
      const todoTarget = e.target;
      const todoText = todoTarget.value.trim();
      if (todoText.length > 0) {
        onAdd(todoTarget.value);
        todoTarget.value = '';
      }
    }
  };

  inputElement.addEventListener('keydown', addTodoItem);
};

export default TodoInput;
