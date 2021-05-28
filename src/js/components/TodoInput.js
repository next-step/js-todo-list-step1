function TodoInput({ onAdd }) 
{
  const $todoInput = document.querySelector('#new-todo-title');

  const addTodoItem = (event) => {
    if (event.key === 'Enter') {
      onAdd($todoInput.value.trim());
      $todoInput.value = '';
    }
  };

  $todoInput.addEventListener("keyup", addTodoItem);
}

export default TodoInput;