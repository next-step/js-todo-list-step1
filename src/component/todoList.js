import * as Util from "../utils/eventUtils.js";
import TodoCount from "./todoCount.js";
import { todoItemTemplate } from "./todoItem.js";

// todoList 보여주는 컴포넌트
export default function TodoList(app) {
  this.$todoList = document.querySelector("#todo-list");
  this.todoCount = new TodoCount(this);
  this.todoItems = [];

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.todoCount.linkStatus();
  };

  this.render = items => {
    const template = items.map(item => todoItemTemplate(item));
    this.$todoList.innerHTML = template.join("\n");
    this.todoCount.count(items);
  };
  
  this.active = () => {
    this.render(this.todoItems.filter(item => !item.isCompleted()));
  }
  
  this.completed = () => {
    this.render(this.todoItems.filter(item => item.isCompleted()));
  }

  this.all = () => {
    this.render(this.todoItems);
  }

  const onClick = (event) => {
    if (Util.checkClassName(event, "toggle")) {
      app.complete(Util.convertId(event));
    }
    if (Util.checkClassName(event, "destroy")) {
      if(confirm("정말로 삭제하시겠습니까?")){
        app.delete(Util.convertId(event));
      }
    }
  }
  
  const onDClick = (event) => {
    if (Util.hasClosest(event) && Util.checkClosestClassName(event, "view")) {
      app.editing(Util.convertId(event));
    }
  }

  const onKey = event => {
    const value = event.target.value;
    if(!Util.checkClosestClassName(event, "editing")){
      return;
    }
    if (Util.checkKey(event, "Enter")) {
      app.edit(Util.convertId(event), value);
    }
    if (Util.checkKey(event, "Escape")) {
      app.editing(Util.convertId(event));
    }
  }

  this.$todoList.addEventListener("click", onClick);
  this.$todoList.addEventListener("dblclick", onDClick);
  this.$todoList.addEventListener("keydown", onKey);
}