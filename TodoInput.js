// 입력 받는 컴포넌트
function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keydown", event => {
      if(event.key == 'Enter'){
          this.addTodoItem(event);
      }
  });

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    // if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    // }
  };
}