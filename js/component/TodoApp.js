import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCountContainer from "./TodoCountContainer.js";
import { $, getUUID } from "./common/Util.js";

export default class TodoApp {
  $target = null;
  $todoInput = null;
  $todoList = null;
  $todoCountContainer = null;
  todoInput = null;
  todoList = null;
  todoCountContainer = null;
  util = null;

  dataIdx = {};
  showTodoItems = [];

  constructor() {
    this.$todoInput = $("#new-todo-title");
    this.$todoList = $("#todo-list");
    this.$todoCountContainer = $(".count-container");
    this.todoInput = new TodoInput({
      target: this.$todoInput,
      onAdd: (value => {
        let data = {
          code: getUUID(),
          title: value,
          isComplete: false
        }

        this.onItemAdd(data);
      })
    });

    this.todoList = new TodoList({
      todoList: this.$todoList,
      itemClick: (event => this.onItemClick(event)),
      itemCheck: (event => this.onItemCheck(event)),
      itemDelete: (event => this.onItemDelete(event)), 
    })   

    this.todoCountContainer = new TodoCountContainer({
      onFilter: (event => {
        this.onFilter(event)
      })
    });

    this.loadLocalStorage();
  }

  onItemAdd(event) {
    this.todoList.onAdd(event);
    this.dataIdx[event.code] = event;
    this.todoCountContainer.setCount(Object.keys(this.dataIdx).length);
    this.setLocalStorage();
  }

  onItemClick(event) {
    this.dataIdx[event.code].title = event.title;
  }

  onItemCheck(event) {
    this.dataIdx[event].isComplete = !this.dataIdx[event].isComplete;
    this.setLocalStorage();
  }

  onItemDelete(event) {
    delete this.dataIdx[event];
    this.todoCountContainer.setCount(Object.keys(this.dataIdx).length);
    this.setLocalStorage();
  }

  onFilter(event) {
    const data = [];

    if(event === "all") {
      Object.values(this.dataIdx).forEach((value) => {
        data.push(value);
      })
    } else if(event === "active") {
      Object.values(this.dataIdx).forEach((value) => {
        if(!value.isComplete) {
          data.push(value);
        }
      })
    } else {
      Object.values(this.dataIdx).forEach((value) => {
        if(value.isComplete) {
          data.push(value);
        }
      })
    }

    this.showTodoItems = data;
    this.setShowItems(this.showTodoItems);
    this.todoCountContainer.setCount(this.showTodoItems.length);
  }

  setShowItems(event) {
    this.$todoList.innerHTML = "";
    event.forEach(data => {
      this.todoList.onAdd(data);
    })    
  }

  loadLocalStorage() {
    const dataIdx = JSON.parse(localStorage.getItem("todoItem"));
    const items = [];

    this.dataIdx = dataIdx;
    
    Object.values(this.dataIdx).forEach(value => {
      items.push(value);
    })

    this.setShowItems(items);
    this.todoCountContainer.setCount(items.length);
  }

  setLocalStorage() {
    localStorage.setItem("todoItem", JSON.stringify(this.dataIdx));
  }
}