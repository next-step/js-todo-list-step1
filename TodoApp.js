// 부모 컴포넌트
function TodoApp() {

    this.todoItems = [];
    this.showCondition = "all";
    this.checkedOfItems = [];

    new TodoInput({
      onAdd: contents => {
        this.todoItems.push(contents);
        this.checkedOfItems.push(false);
        this.todoList.setState(this.todoItems, this.checkedOfItems, this.showCondition);
      }
    });

    this.todoList = new TodoList({
      updateChecked: contents => {
        var index = this.todoItems.indexOf(contents);
        if(this.checkedOfItems[index]){
          this.checkedOfItems[index] = false;
        }
        else{
          this.checkedOfItems[index] = true;
        }
        this.todoStorage.update(this.todoItems, this.checkedOfItems);
      },
      onDelete: $item => {
        var index = this.todoItems.indexOf($item.parentNode.querySelector(".label").innerText);
        this.todoItems.splice(index, 1);
        this.checkedOfItems.splice(index, 1);
        this.todoList.setState(this.todoItems, this.checkedOfItems, this.showCondition);
      },
      updateLocalStorage: (todoItems, checkedOfItems) => {
        this.todoStorage.update(todoItems, checkedOfItems);
      }
    });

    //localStorage.clear();

    this.todoStorage = new TodoStorage({
      loadLocalStorage: (todoItems, checkedOfItems) => {
        this.todoItems = todoItems;
        this.checkedOfItems = checkedOfItems;
      }
    });

    this.todoList.setState(this.todoItems, this.checkedOfItems, this.showCondition);

    document.querySelector(".all-selected").addEventListener("click", () => {
      console.log("all");
      this.todoList.setState(this.todoItems, this.checkedOfItems, "all");
    });
    document.querySelector(".active").addEventListener("click", () => {
      this.todoList.setState(this.todoItems, this.checkedOfItems, "active");
    });
    document.querySelector(".completed").addEventListener("click", () => {
      console.log("completed");
      this.todoList.setState(this.todoItems, this.checkedOfItems, "completed");
    });

}

new TodoApp();