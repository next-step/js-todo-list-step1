import TodoCount from "./todoCount.js";
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

    this.todoItems[index].complete();
    this.setState(this.todoItems);
  };

  this.modifyTodoItem = (id, newTitle) => {
    const newTodoItems = this.todoItems.map((item) => {
      if (item.id == id) {
        return new TodoItem({ ...item, title: newTitle });
      } else return item;
    });

    this.setState(newTodoItems);
  };

  this.todoList = new TodoList({
    todoItems: this.todoItems,
    onComplete: this.completeTodoItem,
    onRemove: this.removeTodoItem,
    onModify: this.modifyTodoItem,
  });

  this.todoInput = new TodoInput({ onAdd: this.addTodoItem });
  this.todoCount = new TodoCount();

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoInput.render();
    this.todoList.render(updatedItems);
    this.todoCount.render(updatedItems);
  };

  this.render = () => {
    this.setState(this.todoItems);
  };
}
