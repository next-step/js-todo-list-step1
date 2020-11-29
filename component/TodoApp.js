// import { todoList } from "./TodoList.js";
import { TodoInput } from "./TodoInput.js";
import { TodoItem } from "./TodoItem.js";
import { TodoList } from "./TodoList.js";

//   if (event.keyCode === 13) {
//     storageObject.setId(id_No);
//     storageObject.setValue(todos.value);
//     addTodos(storageObject);
//     setLocalStorage(storageObject);
//     id_No++;
//   }
// };

export class TodoApp {
  constructor(todoItem) {
    this.todoItem = todoItem || [];
    this.todoList = new TodoList();
    console.log(this.todoItem);
    // this.todoList = new todoList();

    new TodoInput({
      onAdd: (contents) => {
        let todoItem = new TodoItem(contents);
        this.todoItem.push(todoItem);
        this.setState(this.todoItem);
        this.todoItem = [];
      },
    });
  }

  setState(updateItem) {
    console.log("TodoApp state :", updateItem);
    this.todoItem = updateItem;
    this.todoList.setState(this.todoItem);
  }
}
