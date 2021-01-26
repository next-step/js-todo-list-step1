
export function TodoInput( context ) {
    const $todoInput = document.querySelector("#new-todo-title");
  
    $todoInput.addEventListener("keypress", event => this.addTodoItem(event));
  
    this.addTodoItem = event => {
      const $newTodoTarget = event.target;
      if(event.keyCode === 13){
         context.saveItem({todoItem: $newTodoTarget.value, completed: false});
         $todoInput.value = '';
      }
    };
  }
  