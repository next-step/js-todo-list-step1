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
        if(viewMode == "active"){
            this.todoItems = updatedTodoItems.filter((item)=> !item.completed);
        }
        else if(viewMode == "completed"){
            this.todoItems = updatedTodoItems.filter((item)=> item.completed);
        }
        this.render(this.todoItems);
        document.querySelector(".todo-count strong").innerText = this.todoItems.length;
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
  