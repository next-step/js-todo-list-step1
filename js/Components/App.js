import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import { isValidTodoItems, createUniqueId } from "../utils.js";
import TodoCount from "./TodoCount.js";

function App() {
  const $target = document.querySelector("#todoapp");
  this.todoItems = [
    {
      content: "Hello",
      isCompleted: false,
      _id: createUniqueId(),
    },
    {
      content: "World",
      isCompleted: false,
      _id: createUniqueId(),
    },
    {
      content: "JS",
      isCompleted: true,
      _id: createUniqueId(),
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
    this.todoItems.push({
      _id: createUniqueId(),
      content: contentText,
      isCompleted: false,
    });
    this.todoList.setState(this.todoItems);
    this.todoCount.setState(this.todoItems.length);
  };

  this.deleteTodoById = (id) => {
    const todoItemIdx = this.todoItems.findIndex(({ _id }) => _id === id);
    if (todoItemIdx === -1) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    this.todoItems.splice(todoItemIdx, 1);
    this.todoList.setState(this.todoItems);
    this.todoCount.setState(this.todoItems.length);
  };

  this.toggleTodoById = (id) => {
    const todoItem = this.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    todoItem.isCompleted = !todoItem.isCompleted;
    this.todoList.setState(this.todoItems);
  };

  this.editTodoById = (id, content) => {
    const todoItem = this.todoItems.find(({ _id }) => _id === id);
    if (!todoItem) {
      console.log(`Can't find todoItem with id : ${id}`);
      return;
    }
    if (content !== "") {
      todoItem.content = content;
    }
    this.todoList.setState(this.todoItems);
  };

  this.render = () => {
    $target.innerHTML = `
      <h1>TODOS</h1>
      <div id="todo-input"></div>
      <main>
        <div id="todo-list"></div>
        <div class="count-container">
          <div id="todo-count"></div>
        </div>
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
      {
        deleteTodoById: (id) => this.deleteTodoById(id),
        toggleTodoById: (id) => this.toggleTodoById(id),
        editTodoById: (id, content) => this.editTodoById(id, content),
      }
    );
    this.todoCount = new TodoCount(
      document.getElementById("todo-count"),
      this.todoItems.length
    );
  };

  this.init();
}

export default App;
