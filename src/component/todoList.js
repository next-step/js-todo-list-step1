import { converter, todoInputTemplate, todoItemTemplate } from "./todoItem.js";

// todoList 보여주는 컴포넌트
export default function TodoList(app) {
  this.$todoList = document.querySelector("#todo-list");

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(item => todoItemTemplate(item));
    this.$todoList.innerHTML = template.join("\n");
  };
  
  const onClick = (event) => {
    if (event.target.className === "toggle") {
      app.complete(findclosest(event));
    }
    if (event.target.className === "destroy") {
      app.delete(findclosest(event));
    }
  }
  
  const onDClick = (event) => {
    app.edit(findclosest(event));
  }

  this.$todoList.addEventListener("click", onClick);
  this.$todoList.addEventListener("dblclick", onDClick);
}


function findclosest(event) {
  return event.target.closest("li");
}