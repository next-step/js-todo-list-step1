import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import { isValidTodoItems } from "../utils.js";

function App() {
  const $target = document.querySelector("#todoapp");
  this.todoItems = [
    {
      content: "JS study",
      isCompleted: false,
    },
    {
      content: "Hello",
      isCompleted: false,
    },
    {
      content: "World",
      isCompleted: true,
    },
  ];

  this.setState = (newTodoItems) => {
    if (!isValidTodoItems(newTodoItems)) {
      throw Error("Wrong todoItems");
    }
    this.todoItems = newTodoItems;
    this.init();
  };

  this.addTodo = (contentText) => {
    console.log("addTodo...", contentText);
    this.todoItems.push({ content: contentText, isCompleted: false });
    this.todoList.setState(this.todoItems);
  };

  this.render = () => {
    $target.innerHTML = `
      <h1>TODOS</h1>
      <div id="todo-input"></div>
      <main>
        <div id="todo-list"></div>
      </main>
    `;
  };

  this.init = () => {
    this.render();
    this.todoInput = new TodoInput(document.getElementById("todo-input"), {
      onSubmit: (contentText) => this.addTodo(contentText),
    });
    this.todoList = new TodoList(
      document.getElementById("todo-list"),
      this.todoItems,
      {}
    );
  };

  this.init();
}

export default App;
