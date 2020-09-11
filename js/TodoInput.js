export function TodoInput({addItem}){
    const $todoInput = document.querySelector("#new-todo-title");
  
    this.addTodoItem = event => {
      const $newTodoTarget = event.target;
      if ($newTodoTarget.value && event.key == "Enter") {
        addItem($newTodoTarget.value);
        $newTodoTarget.value = "";
      }
    };
    
    $todoInput.addEventListener("keydown", this.addTodoItem);
}
