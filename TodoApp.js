// 부모 컴포넌트
function TodoApp() {

    this.todoItems = [];
    this.showCondition = "all";
    this.count = this.todoItems.length;

    new TodoInput({
      onAdd: contents => {
        const newTodoItem = new TodoItem(contents, false);
        this.todoItems.push(newTodoItem);
        this.todoList.setState(this.todoItems, this.showCondition);
      }
    });

    this.todoList = new TodoList({
      render : showItems => {

        this.todoList.$todoList.innerHTML = ``;
        showItems.forEach($item => {
            this.todoList.$todoList.append($item);
        });

        this.todoList.$todoList.addEventListener("click", e => {
            document.querySelectorAll(".toggle").forEach($item => {
                if($item.contains(e.target)){
                    if($item.checked === true){
                        $item.parentNode.parentNode.classList.add("completed");
                    }
                    else{
                        $item.parentNode.parentNode.classList.remove("completed");
                    }
                }
            });
        });

        this.todoList.$todoList.addEventListener("click", e => {
            document.querySelectorAll(".destroy").forEach($item => {
                if($item.contains(e.target)){
                  this.todoItems.splice(this.todoItems.indexOf($item.parentNode.parentNode), 1);
                    this.todoList.setState(this.todoItems, this.showCondition);
                }
            });
        });

        document.querySelectorAll(".label").forEach($item => {
            $item.addEventListener("dblclick", () => {
                $item.parentNode.parentNode.classList.add("editing");
                $item.parentNode.parentNode.addEventListener("keyup", e => {
                    if(e.key === 'Escape'){
                        $item.parentNode.parentNode.classList.remove("editing");
                    }
                })
            })
        });

        document.querySelector(".todo-count").innerHTML = 
            `총 <strong>${document.querySelectorAll(".label").length}</strong> 개`;
        
      }
    });

    // this.todoStorage = new TodoStorage();
    // this.todoItems = this.todoStorage.init();

    this.todoList.setState(this.todoItems, this.showCondition);

    document.querySelector(".all-selected").addEventListener("click", () => {
      this.todoList.setState(this.todoItems, "all");
    });
    document.querySelector(".active").addEventListener("click", () => {
      this.todoList.setState(this.todoItems, "active");
    });
    document.querySelector(".completed").addEventListener("click", () => {
      this.todoList.setState(this.todoItems, "completed");
    });

}