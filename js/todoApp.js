import TodoInput from "./todoInput.js";
import TodoItem from "./todoItem.js";
import TodoList from "./todoList.js";

export default function TodoApp() {
  this.todoItems = [];

  this.addTodoItem = (title) => {
    const newId =
      this.todoItems.length > 0
        ? this.todoItems[this.todoItems.length - 1].id + 1
        : 1;

    this.todoItems.push(new TodoItem({ id: newId, title: title, status: "" }));
    this.setState(this.todoItems);
  };

  this.removeTodoItem = (id) => {
    const index = this.todoItems.findIndex((item) => item.id == id);
    this.todoItems.splice(index, 1);

    this.setState(this.todoItems);
  };

  this.completeTodoItem = (id) => {
    const index = this.todoItems.findIndex((item) => item.id == id);
    console.log(index);
    this.todoItems[index].complete();
    this.setState(this.todoItems);
  };

  this.todoList = new TodoList({
    todoItems: this.todoItems,
    onComplete: this.completeTodoItem,
    onRemove: this.removeTodoItem,
  });

  this.setState = (updatedItems) => {
    this.todoList.render(updatedItems);
  };

  this.render = () => {
    new TodoInput({ onAdd: this.addTodoItem });
    this.todoList.render();
  };
}
