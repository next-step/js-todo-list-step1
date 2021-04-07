import { todoItemTemplate } from "./todoItem.js";

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
            app.complete(event.target.closest("li"));
          }
    }
    
    this.$todoList.addEventListener("click", onClick);

  }