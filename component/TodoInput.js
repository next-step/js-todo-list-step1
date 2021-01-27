
export function TodoInput( context ) {
    const $todoInput = document.querySelector("#new-todo-title");
  
  
    this.addTodoItem = event => {
      const $newTodoTarget = event.target;
      if(event.key === 'Enter'){
         context.saveItem({todoItem: $newTodoTarget.value, completed: false});
         $todoInput.value = '';
      }
    };
    
    $todoInput.addEventListener("keypress", this.addTodoItem);
  }
  