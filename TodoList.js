// todoList 보여주는 컴포넌트
function TodoList({ updateChecked, onDelete, updateLocalStorage }) {

    this.$todoList = document.createElement("ul");
    this.$todoList.id = 'todo-list';
    this.$todoList.className = 'todo-list';
    document.querySelector(".new-todo").after(this.$todoList);

    this.$todoList.addEventListener("click", e => {
        document.querySelectorAll(".toggle").forEach($item => {
            if($item.contains(e.target)){
                if($item.checked === true){
                    $item.parentNode.parentNode.classList.add("completed");
                }
                else{
                    $item.parentNode.parentNode.classList.remove("completed");
                }
                updateChecked($item.parentNode.querySelector('label').innerText);
            }
        });
    });

    this.$todoList.addEventListener("click", e => {
        document.querySelectorAll(".destroy").forEach($item => {
            if($item.contains(e.target)){
              onDelete($item);
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

    this.setState = (todoItems, checkedOfItems, showCondition) => {
        
        updateLocalStorage(todoItems, checkedOfItems);

        let showItems = [];
        let checkedOfShowItems = [];

        if(showCondition === "all"){
            showItems = todoItems;
            checkedOfShowItems = checkedOfItems;
        }
        else if(showCondition === "active"){
            for(var i = 0; i < todoItems.length; i++){
                if(!checkedOfItems[i]){
                    showItems.push(todoItems[i]);
                    checkedOfShowItems.push(checkedOfItems[i]);
                }
            }
        }
        else if(showCondition === "completed"){
            for(var i = 0; i < todoItems.length; i++){
                if(checkedOfItems[i]){
                    showItems.push(todoItems[i]);
                    checkedOfShowItems.push(checkedOfItems[i]);
                }
            }
        }
        this.render(showItems, checkedOfShowItems);
    };
  
    this.render = (showItems, checkedOfShowItems) => {

        this.$todoList.innerHTML = ``;
        try{
            for(var i = 0; i < showItems.length; i++){
                this.$todoList.appendChild(new TodoItem(showItems[i], checkedOfShowItems[i]));
            }
        }
        catch(exception){
            this.$todoList.innerHTML = ``;
        }

        document.querySelector(".todo-count").innerHTML = 
            `총 <strong>${document.querySelectorAll(".label").length}</strong> 개`;
        
    };
}