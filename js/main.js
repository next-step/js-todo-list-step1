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
        },
        onChangeState: contents => {
            this.todoItems.forEach((item,index)=>{
                if(item.id == contents) {
                    item.toggleState();
                }
            });
            this.setState(this.todoItems);
        },
        onChangeTitle: (contents,title) => {
            this.todoItems.forEach((item,index) => {
                if(item.id == contents) {
                    item.title = title;
                }
            });
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

function TodoList({onRemove,onChangeState,onChangeTitle}) {
    const $todoList = document.querySelector("#todo-list");

    $todoList.addEventListener("click", event => this.clickEvent(event));
    $todoList.addEventListener("dblclick", event => this.editTitleMode(event));
    $todoList.addEventListener("keyup", event => this.stopChangeTitle(event));
    $todoList.addEventListener("focusout", event => this.changeTitle(event));


    this.clickEvent = event => {
        if (event.target.classList == "destroy") this.removeItem(event);
        if (event.target.classList == "toggle") this.changeItemState(event);
    }

    this.removeItem = event => {
        if(event.target && event.target.nodeName == "BUTTON"){
          if(confirm("정말로 삭제하시겠습니까?")){ 
              onRemove(event.target.closest("li").dataset.id);
          }
        }
    }

    this.changeItemState = event => {
        if(event.target && event.target.nodeName == "INPUT"){
            event.target.closest("li").classList.toggle("completed");
            onChangeState(event.target.closest("li").dataset.id);
        }
    }

    this.editTitleMode = event => {
        if (event.target && event.target.nodeName == "LABEL"){
            event.target.closest("li").classList.add("editing");
            event.target.closest("li").lastElementChild.focus();
       }
    }   

    this.stopChangeTitle = event => {
        if (event.target && event.target.nodeName == "INPUT" && event.target.classList == "edit" && event.key == "Escape"){
            event.target.closest("li input").value = event.target.closest("li").querySelector("label").innerText;
            event.target.closest("li").classList.remove("editing");
        }
      }

    this.changeTitle = event => {
        if (event.target && event.target.nodeName == "INPUT" && event.target.classList == "edit"){
            event.target.closest("li").querySelector("label").innerText = event.target.closest("li input").value;
            event.target.closest("li").classList.remove("editing");
            onChangeTitle(event.target.closest("li").dataset.id,event.target.closest("li").querySelector("label").innerText);
            
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
    
    function todoItemTemplate({title,id,completed}){
        return ` <li data-id="${id}" class=${completed?"completed" : ""}>
                        <div class="view">
                            <input class="toggle" type="checkbox" ${completed?"checked":""}>
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

    this.toggleState = ()=>{
        this.completed = !this.completed;
    }
}

new TodoApp();