function TodoApp() {
    this.todoItems = [];
    this.id = 0;

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        todoList.setState(this.todoItems);
      };

    new TodoInput({
        onAdd: contents => {
          const newTodoItem = new TodoItem(contents,this.id++);
          this.todoItems.push(newTodoItem);
          this.setState(this.todoItems);
        }
    });
    
    const todoList = new TodoList();

}  

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

function TodoList() {
    const $todoList = document.querySelector("#todo-list");
    this.setState = (updatedTodoItems,viewMode) => {
      this.todoItems = updatedTodoItems;
      this.render(this.todoItems);
    };
  
    this.render = items => {
       const template = items.map(todoItemTemplate);
       $todoList.innerHTML = template.join("");
    };
    
    function todoItemTemplate({title,id}){
        return ` <li data-id="${id}">
                        <div class="view">
                            <input class="toggle" type="checkbox">
                            <label class="label">${title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${title}">
                    </li>`;
      }
  }
  
function TodoItem(title,id){
    this.id = id;
    this.title = title;
    this.completed = false;
}

new TodoApp();