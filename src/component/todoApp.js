import TodoInput from "./todoInput.js";
import TodoList from "./todoList.js";
import { TodoItem } from "./todoItem.js";

// 부모 컴포넌트
export default function TodoApp(div) {
  this.todoItems = []
  this.todoList = new TodoList(this);
  this.idGenerator = 0;

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

  const add = contents => {
    const newTodoItem = new TodoItem(this.idGenerator++, contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  }

  this.todoInput = new TodoInput({onAdd : add}); 
  
  this.complete = targetId => {
    this.todoItems.filter(item => item.match(targetId))
        .forEach(item => item.changeComplete());
    this.setState(this.todoItems);
  }

  this.delete = targetId => {
    this.todoItems = this.todoItems.filter(item => !item.match(targetId));
    this.setState(this.todoItems);
  }

  this.edit = (targetId, value) => {
    this.todoItems.filter(item => item.match(targetId))
        .forEach(item => item.text = value);
    this.setState(this.todoItems);
  }
}
