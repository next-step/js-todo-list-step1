// todoList 보여주는 컴포넌트
function TodoList() {

    this.todoItems = [];
    this.state = "all";

    this.$todoList = document.createElement("ul");
    this.$todoList.id = 'todo-list';
    this.$todoList.className = 'todo-list';
    document.querySelector(".new-todo").after(this.$todoList);

    document.querySelector(".all-selected").addEventListener("click", () => {
        this.setState("all");
    });
    document.querySelector(".active").addEventListener("click", () => {
        thsi.setState("active");
    });
    document.querySelector(".completed").addEventListener("click", () => {
        this.setState("completed");
    });

    this.setState = updatedTodoItems => {
        if(this.state === "all"){
            this.todoItems = updatedTodoItems;
        }
        else if(this.state === "active"){
            this.todoItems = [];
            updatedTodoItems.forEach($item => {
                if($item.querySelector(".toggle").checked === false){
                    this.todoItems.push($item);
                }
            });
        }
        else if(this.state === "completed"){
            this.todoItems = [];
            updatedTodoItems.forEach($item => {
                if($item.querySelector(".toggle").checked === true){
                    this.todoItems.push($item);
                }
            });
        }
        this.render(this.todoItems);
    };
  
    this.render = items => {
        this.$todoList.innerHTML = ``;
        items.forEach($item => {
            this.$todoList.appendChild($item);
        });

        document.querySelectorAll(".toggle").forEach($item => {
            $item.addEventListener("click", () => {
                if($item.checked === true){
                    $item.parentNode.parentNode.classList.add("completed");
                }
                else{
                    $item.parentNode.parentNode.classList.remove("completed");
                }
            })
        });

        document.querySelectorAll(".destroy").forEach($item => {
            $item.addEventListener("click", () => {
                let pos = -1;
                for(let i = 0; i < this.listEditor.allList.length; i++){
                    if(this.listEditor.allList[i].querySelector(".label").innerText === $item.parentNode.querySelector(".label").innerText){
                        pos = i; break;
                    }
                }
                if(pos >= 0){
                    this.todoItems.splice(pos, 1);
                }
                this.setState();
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
        
    };
}