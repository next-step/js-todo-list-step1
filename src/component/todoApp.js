import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { TodoItem, converter, todoInputTemplate } from "./todoItem.js";

// 부모 컴포넌트
export default function TodoApp(div) {
  this.todoItems = []
  this.todoList = new TodoList(this);

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

  const add = contents => {
    const newTodoItem = new TodoItem(this.todoItems.length, contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  }

  this.todoInput = new TodoInput({onAdd : add}); 
  
  this.complete = target => {
    target.className = "completed";
    target.querySelector("input").setAttribute("checked", true);
  }

  this.delete = target => {
    const index = converter(target);
    this.todoItems = this.todoItems.filter(item => item.id != index);
    this.setState(this.todoItems);
    target.remove();
  }

  this.edit = target => {
    target.className = "edit";
    const index = converter(target);
    const itemIndex = this.todoItems.findIndex(item => item.id == index);
    console.log("before"+ target.innerHTML);
    target.innerHTML = todoInputTemplate(this.todoItems[itemIndex]);
    console.log("after" + target.innerHTML);
    target.addEventListener("keydown", function(event) {
      if(event.key === "Enter") {
        console.log(evet.target.value);
        this.todoItems[itemIndex] = event.target.value;
        event.target.value = ""; 
        this.setState(this.todoItems);
        target.className = "view";
      }
    });
  }

}
