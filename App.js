class App{
    constructor(){

        this.listEditor = new listEditor({
            addList : todo => {
                const $newList = document.createElement("li");
                $newList.innerHTML = `
                    <div class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label">${todo}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value=${todo} />`;

                this.listEditor.allList.push($newList);

                this.setState(true);
            },
            setState : () => {
                this.setState();
            }
        });

    }

    setState () { 
        if(this.listEditor.state === "all"){
            this.listEditor.currentList = this.listEditor.allList;
        }
        else if(this.listEditor.state === "active"){
            this.listEditor.currentList = [];
            this.listEditor.allList.forEach($item => {
                if($item.querySelector(".toggle").checked === false){
                    this.listEditor.currentList.push($item);
                }
            });
        }
        else if(this.listEditor.state === "completed"){
            this.listEditor.currentList = [];
            this.listEditor.allList.forEach($item => {
                if($item.querySelector(".toggle").checked === true){
                    this.listEditor.currentList.push($item);
                }
            });
        }
        this.render();
    }

    render() {
        this.listEditor.todoList.innerHTML = ``;
        this.listEditor.currentList.forEach($item => {
            this.listEditor.todoList.appendChild($item);
        });

        this.listEditor.todoList.addEventListener("click", e => {
            document.querySelectorAll(".toggle").forEach($item => {
                if($item.checked === true){
                    $item.parentNode.parentNode.classList.add("completed");
                }
                else{
                    $item.parentNode.parentNode.classList.remove("completed");
                }
            });
            document.querySelectorAll(".destroy").forEach($item => {
                if($item.contains(e.target)){
                    $item.parentNode.parentNode.remove();
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

}

new App();