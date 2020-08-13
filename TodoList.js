// todoList 보여주는 컴포넌트
function TodoList() {

    this.todoItems = [];
    this.state = "all";

    this.todoStorage = new TodoStorage();
    this.todoItems = this.todoStorage.init();

    this.$todoList = document.createElement("ul");
    this.$todoList.id = 'todo-list';
    this.$todoList.className = 'todo-list';
    document.querySelector(".new-todo").after(this.$todoList);

    this.addItem = newItem => {
        this.todoItems.push(newItem);
        this.setState(this.state);
    };

    this.setState = newState => {
        
        this.todoStorage.update(this.todoItems);

        this.state = newState;
        let showItems = [];

        if(this.state === "all"){
            showItems = this.todoItems;
        }
        else if(this.state === "active"){
            showItems = [];
            this.todoItems.forEach($item => {
                if($item.querySelector(".toggle").checked === false){
                    showItems.push($item);
                }
            });
        }
        else if(this.state === "completed"){
            showItems = [];
            this.todoItems.forEach($item => {
                if($item.querySelector(".toggle").checked === true){
                    showItems.push($item);
                }
            });
        }
        this.render(showItems);
    };
  
    this.render = items => {

        this.$todoList.innerHTML = ``;
        items.forEach($item => {
            this.$todoList.append($item);
        });

        this.$todoList.addEventListener("click", e => {
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

        this.$todoList.addEventListener("click", e => {
            document.querySelectorAll(".destroy").forEach($item => {
                if($item.contains(e.target)){
                    this.todoItems.splice(this.todoItems.indexOf($item.parentNode.parentNode), 1);
                    this.setState(this.state);
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
        
    };

    this.setState(this.state);
}