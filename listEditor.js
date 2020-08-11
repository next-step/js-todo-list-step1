class listEditor {
   
    constructor({addList, setState, render}){
        this.todoList = document.createElement("ul");
        this.todoList.id = 'todo-list';
        this.todoList.className = 'todo-list';
        document.querySelector(".todoapp").appendChild(this.todoList);

        this.allList = [];
        this.currentList = this.allList;
        this.state = "all";

        this.input = document.querySelector(".new-todo");
        this.input.addEventListener('keypress', function(e) {
            if(e.key == 'Enter'){
                addList(e.target.value);
            }
        });

        document.querySelector(".all-selected").addEventListener("click", () => {
            this.state = "all";
            setState();
        });
        document.querySelector(".active").addEventListener("click", () => {
            this.state = "active";
            setState();
        });
        document.querySelector(".completed").addEventListener("click", () => {
            this.state = "completed";
            setState();
        });
    }
}

