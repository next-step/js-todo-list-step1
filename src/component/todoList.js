import TodoCount from "./todoCount.js";
import { todoItemTemplate } from "./todoItem.js";

// todoList 보여주는 컴포넌트
export default function TodoList(app) {
  this.$todoList = document.querySelector("#todo-list");
  this.todoCount = new TodoCount(this);

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
    this.todoCount.count(this.todoItems);
  };

  this.render = items => {
    const template = items.map(item => todoItemTemplate(item));
    this.$todoList.innerHTML = template.join("\n");
  };
  
  this.active = () => {
    this.render(this.todoItems.filter(item => !item.completed));
  }
  
  this.completed = () => {
    this.render(this.todoItems.filter(item => item.completed));
  }

  const onClick = (event) => {
    if (event.target.className === "toggle") {
      app.complete(findClosest(event));
    }
    if (event.target.className === "destroy") {
      if(confirm("정말로 삭제하시겠습니까?")){
        app.delete(findClosest(event));
      }
    }
  }
  
  const onDClick = (event) => {
    if (findClosest(event) !== null) {
      findClosest(event).className = "editing";
    }
  }

  const onKey = event => {
    const value = event.target.value;
    if(findClosest(event).className !== "editing"){
      return;
    }
    if (event.key === "Enter") {
      app.edit(findClosest(event), value);
    }
    if (event.key === "Escape") {
      findClosest(event).className = "view";
    }
  }

  this.$todoList.addEventListener("click", onClick);
  this.$todoList.addEventListener("dblclick", onDClick);
  this.$todoList.addEventListener("keydown", onKey);
}


function findClosest(event) {
  return event.target.closest("li");
}