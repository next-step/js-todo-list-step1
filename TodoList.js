// todoList 보여주는 컴포넌트
function TodoList({render}) {

    this.$todoList = document.createElement("ul");
    this.$todoList.id = 'todo-list';
    this.$todoList.className = 'todo-list';
    document.querySelector(".new-todo").after(this.$todoList);

    this.setState = (todoItems, showCondition) => {
        
        //this.todoStorage.update(todoItems);

        let showItems = [];

        if(showCondition === "all"){
            showItems = todoItems;
        }
        else if(showCondition === "active"){
            showItems = [];
            todoItems.forEach($item => {
                if($item.querySelector(".toggle").checked === false){
                    showItems.push($item);
                }
            });
        }
        else if(showCondition === "completed"){
            showItems = [];
            todoItems.forEach($item => {
                if($item.querySelector(".toggle").checked === true){
                    showItems.push($item);
                }
            });
        }
        this.render(showItems);
    };
  
    this.render = render;
}