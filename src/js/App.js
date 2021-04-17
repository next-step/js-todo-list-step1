import { $, $$ } from "./util/domSelection.js";
import { DAO } from "./datastore/datastore.js";
import { TodoList, TodoStatusContainer } from "./component/todo/Todo.js";

class TodoApp {
  constructor(todoItemArray) {
    this.todoItemArray = todoItemArray;

    const newTodoInput = $("#new-todo-title");
    newTodoInput.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.addItem(newTodoInput.value);
        newTodoInput.value = "";
      }
    });
  }
  loadData() {
    this.todoItemArray = DAO.loadData();
    this.setState();
  }
  addItem(data) {
    if (!data || data.trim() == "") return;
    DAO.addItem(this.todoItemArray);
    this.setState();
  }
  deleteItem(index) {
    DAO.deleteItem(index, this.todoItemArray);
    this.setState();
  }
  updateItem(index, data) {
    DAO.updateItem(index, this.todoItemArray, data);
    this.setState();
  }
  updateItemState(index, isCompleted) {
    if (isCompleted) {
      DAO.updateItemState(index, this.todoItemArray, TodoItem.COMPLETED);
    } else {
      DAO.updateItemState(index, this.todoItemArray, TodoItem.ACTIVE);
    }
    this.setState();
  }
  setState() {
    if (this.todoList) {
      this.todoList.setState(this.todoItemArray);
    }
    if (this.todoStatusContainer) {
      this.todoStatusContainer.setState();
    }
    DAO.saveData(this.todoItemArray);
  }
}
const todoApp = new TodoApp([]);
const todoList = new TodoList(todoApp);
const todoStatusContainer = new TodoStatusContainer();

todoApp.todoList = todoList;
todoApp.todoStatusContainer = todoStatusContainer;
todoApp.loadData();
