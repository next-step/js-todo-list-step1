/* 
* TodoApp Component를 관리 (Write)
*/

import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { createItems, TodoItem } from "./todoItem.js";
import * as JsonUtil from "../utils/localStorageUtils.js";

export default function TodoApp(div) {

  this.todoItems = createItems(JsonUtil.getElement("items"));
  this.idGenerator = JsonUtil.getElement("idGenerator") ?? 0;
  this.todoList = new TodoList(this);

  this.render = () => {
    new TodoInput(this);
    this.setState();
  }

  this.setState = () => {
    JsonUtil.setElement("items", this.todoItems);
    JsonUtil.setElement("idGenerator", this.idGenerator);
    this.todoList.setState(this.todoItems);
  };

  this.add = contents => {
    const newTodoItem = new TodoItem(this.idGenerator++, contents);
    this.todoItems.push(newTodoItem);
    this.setState();
  }
  
  this.complete = targetId => {
    this.todoItems.find(item => item.match(targetId)).complete();
    this.setState();
  }

  this.delete = targetId => {
    this.todoItems = this.todoItems.filter(item => !item.match(targetId));
    this.setState();
  }

  this.editing = targetId => {
    this.todoItems.find(item => item.match(targetId)).changeStatus();
    this.setState();
  }

  this.edit = (targetId, value) => {
    this.todoItems.find(item => item.match(targetId)).edit(value);
    this.setState();
  }
}
