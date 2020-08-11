class App{
    constructor(){

        this.listEditor = new listEditor({
            addList : todo => {
                this.listEditor.allList.push(todo);
                this.setState();
            },
            setState : () => {
                this.setState();
            },
            render : () => {
                this.render();
            }
        });

    }

    setState () { 
        if(this.listEditor.state === "all"){
            this.listEditor.currentList = this.listEditor.allList;
        }
        else if(this.listEditor.state === "active"){
            this.listEditor.currentList = this.listEditor.allList;
            //this.listEditor.currentList = this.listEditor.todoList.querySelectorAll("li:not(.completed)");
        }
        else if(this.listEditor.state === "completed"){
            this.listEditor.currentList = this.listEditor.allList;
            //this.listEditor.currentList = this.listEditor.todoList.querySelectorAll(".completed");
        }
        this.render();
    }

    render() {
        this.listEditor.todoList.innerHTML = this.listEditor.currentList.map(
            todo => `
            <li>
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${todo}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value=${todo} />
            </li>`
            ).join("");

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
                let pos = this.listEditor.allList.indexOf($item.parentNode.querySelector(".label").value);
                this.listEditor.allList.splice(pos, 1);
                this.setState();
                document.querySelector(".todo-count").innerHTML = 
                    `총 <strong>${document.querySelectorAll(".label").length}</strong> 개`;
            })
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

}

new App();