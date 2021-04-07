import { TodoItemTemplate } from "./todoItem.js";

// todoList 보여주는 컴포넌트
export default function TodoList() {
    this.$todoList = document.querySelector("#todo-list");

    this.setState = updatedTodoItems => {
      this.todoItems = updatedTodoItems;
      this.render(this.todoItems);
    };
  
    this.render = items => {
      const template = items.map(item => TodoItemTemplate(item));
      this.$todoList.innerHTML = template.join("\n");
    };
  }