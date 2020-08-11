import {
  todoListId,
  todoInputId,
  todoCountId,
  todoFilterId,
  goalList,
} from "../utils/data.js";
import { createUniqueID } from "../utils/util.js";
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";

export default function App() {
  this.init = () => {
    this.state = {
      todoList: goalList,
      todoCount: goalList.length,
    };
    this.todoInput = new TodoInput({
      elementId: todoInputId,
      addTodos: this.addTodo,
    });
    this.todoList = new TodoList({
      todoList: goalList,
      elementId: todoListId,
      deleteTodo: this.deleteTodo,
      toggleTodo: this.toggleTodo,
      editTodo: this.editTodo,
    });
    this.todoCount = new TodoCount({
      elementId: todoCountId,
      todoCount: this.state.todoCount,
    });
    this.todoFilter = new TodoFilter({
      elementId: todoFilterId,
      filterTodo: this.filterTodo,
    });
  };
  this.filterTodo = ({ type }) => {
    if (type === "all") {
      this.render();
    } else if (type === "completed") {
      this.render({
        todoList: this.state.todoList.filter((todo) => todo.isCompleted),
        todoCount: this.state.todoList.filter((todo) => todo.isCompleted)
          .length,
      });
    } else {
      this.render({
        todoList: this.state.todoList.filter((todo) => !todo.isCompleted),
        todoCount: this.state.todoList.filter((todo) => !todo.isCompleted)
          .length,
      });
    }
  };
  this.toggleTodo = ({ id }) => {
    this.setState(
      this.state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  };
  this.deleteTodo = ({ id }) => {
    this.setState(this.state.todoList.filter((todo) => todo.id !== id));
  };
  this.addTodo = ({ content }) => {
    this.setState([
      ...this.state.todoList,
      {
        id: `${createUniqueID()}${this.state.todoList.length}`,
        content,
        isCompleted: false,
      },
    ]);
  };
  this.editTodo = ({ content, id }) => {
    this.setState(
      this.state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.content = content;
        }
        return todo;
      })
    );
  };
  this.setState = (todoList) => {
    this.state.todoList = todoList;
    this.state.todoCount = this.state.todoList.length;
    this.render();
  };
  this.render = (
    { todoList: todoList, todoCount: todoCount } = {
      todoList: this.state.todoList,
      todoCount: this.state.todoCount,
    }
  ) => {
    this.todoList.setState(todoList);
    this.todoCount.setState(todoCount);
  };
  try {
    if (!(this instanceof App)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.init();
  } catch {}
}
