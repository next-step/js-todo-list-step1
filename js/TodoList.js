export function TodoList({onRemove,onChangeState,onChangeTitle}) {
    const $todoList = document.querySelector("#todo-list");

    this.clickEvent = ({target}) => {
        if (target.classList == "destroy") this.removeItem(target);
        if (target.classList == "toggle") this.changeItemState(target);
    }

    this.removeItem = target => {
          if(confirm("정말로 삭제하시겠습니까?")){ 
              onRemove(Number(target.closest("li").dataset.id));
        }
    }

    this.changeItemState = target => {
            target.closest("li").classList.toggle("completed");
            onChangeState(Number(target.closest("li").dataset.id));
    }

    this.editTitleMode = ({target}) => {
        if (target.nodeName == "LABEL"){
            target.closest("li").classList.add("editing");
            target.closest("li").lastElementChild.focus();
       }
    }   

    this.stopChangeTitle = event => {
        if (event.target && event.target.nodeName == "INPUT" && event.target.classList == "edit" && event.key == "Escape"){
            event.target.closest("li input").value = event.target.closest("li").querySelector("label").innerText;
            event.target.closest("li").classList.remove("editing");
        }
      }

    this.changeTitle = ({target}) => {
        if (target.nodeName == "INPUT" && target.classList == "edit"){
            target.closest("li").querySelector("label").innerText = target.closest("li input").value;
            target.closest("li").classList.remove("editing");
            onChangeTitle(Number(target.closest("li").dataset.id),target.closest("li").querySelector("label").innerText);
            
        }
    }

    $todoList.addEventListener("click", this.clickEvent);
    $todoList.addEventListener("dblclick", this.editTitleMode);
    $todoList.addEventListener("keyup", this.stopChangeTitle);
    $todoList.addEventListener("focusout", this.changeTitle);


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
        return ` <li data-id="${id}" ${completed ? ' class="completed"' : ''}>
                        <div class="view">
                            <input class="toggle" type="checkbox" ${completed?"checked":""}>
                            <label class="label">${title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${title}">
                    </li>`;
    }
} 
  