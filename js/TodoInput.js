import ItemController from "./ItemController.js"
import Render from "./render.js"
export class TodoInput{
  constructor(){
    this.$todoInput = qs("#new-todo-title");
    
    this.$todoInput.addEventListener("keydown", ({target, key}) => {
      if(key === "Enter" && !!target.value.trim()) {
        const item = ItemController.add({title:target.value});
        console.log(item);
        Render.todoList.add(item);
        Render.todoCount.count();
        target.value = "";
      }
    });
  }
}
