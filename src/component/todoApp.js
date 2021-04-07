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
    const item = converter(target);
    console.log(item);
    // console.log(item);
    // target.innerHTML = 1;
    // console.log(target);
    // console.log(target.innerHTML);
    // target.innerHTML = todoInputTemplate(item);
    // target.addEventListener("keydown", function(event) {
    //   if(event.key === "Enter") {
    //     const index = this.todoItems.indexOf(item);
    //     this.todoItems[index] = event.target.value;
    //     event.target.value = "";
    //   }
    // });
    // target.className = "view";
    // this.setState(this.todoItems);
  }

}
