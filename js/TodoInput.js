export class TodoInput{
  constructor({addItem}){
    this.$todoInput = document.querySelector("#new-todo-title");
    this.addItem = addItem;
    
    this.$todoInput.addEventListener("keydown", ({target, key}) => {
      if(key === "Enter") this.addTodoItem(target);
    });
  }
  
  addTodoItem(target) {
    const $newTodoTarget = target;
    if(!!$newTodoTarget.value.trim()) {
      this.addItem($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  }
}
