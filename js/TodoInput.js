function TodoInput({onAdd}){
    const $todoInput = document.querySelector("#new-todo-title");
  
    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));
  
    this.addTodoItem = event => {
      const $newTodoTarget = event.target;
      if (this.isValid(event, $newTodoTarget)) {
        onAdd($newTodoTarget.value);
        $newTodoTarget.value = "";
      }
    };
  
    this.isValid = (event,input) => {
      if(event && input.value && event.key == "Enter")
        return true;
    }
}
