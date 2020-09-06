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
    
    const todoList = new TodoList({
        onRemove: contents => {
            this.todoItems.forEach((item,index)=>{
                if(item.id == contents) this.todoItems.splice(index,1);
            });
            this.setState(this.todoItems);
        }
    });

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

function TodoList({onRemove}) {
    const $todoList = document.querySelector("#todo-list");

    $todoList.addEventListener("click", event => this.clickEvent(event));

    this.clickEvent = event => {
        if (event.target.classList == "destroy") this.removeItem(event);
    }

    this.removeItem = event => {
        if(event.target && event.target.nodeName == "BUTTON"){
          if(confirm("정말로 삭제하시겠습니까?")){ 
              onRemove(event.target.closest("li").dataset.id);
          }
        }
    }

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