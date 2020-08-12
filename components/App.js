import {
  TODO_LIST_ID,
  TODO_INPUT_ID,
  TODO_COUNT_ID,
  TODO_FILTER_ID,
  ALL,
  COMPLETED,
} from "../utils/data.js";
import { createUniqueID, getTodosFromLS, setTodosLS } from "../utils/util.js";
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import TodoFilter from "./TodoFilter.js";

export default function App() {
  this.init = () => {
    this.state = {
      todoList: getTodosFromLS(),
      todoCount: getTodosFromLS().length,
      todoFilter: ALL,
    };
    this.todoInput = new TodoInput({
      elementId: TODO_INPUT_ID,
      addTodos: this.addTodo,
    });
    this.todoList = new TodoList({
      todoList: this.state.todoList,
      elementId: TODO_LIST_ID,
      deleteTodo: this.deleteTodo,
      toggleTodo: this.toggleTodo,
      editTodo: this.editTodo,
    });
    this.todoCount = new TodoCount({
      elementId: TODO_COUNT_ID,
      todoCount: this.state.todoCount,
    });
    this.todoFilter = new TodoFilter({
      elementId: TODO_FILTER_ID,
      filterType: this.state.todoFilter,
      filterTodo: this.filterTodo,
    });
  };
  this.filterTodo = ({ type }) => {
    if (type === ALL) {
      this.render();
    } else if (type === COMPLETED) {
      this.render({
        todoList: this.state.todoList.filter((todo) => todo.isCompleted),
        todoCount: this.state.todoList.filter((todo) => todo.isCompleted)
          .length,
        todoFilter: type,
      });
    } else {
      this.render({
        todoList: this.state.todoList.filter((todo) => !todo.isCompleted),
        todoCount: this.state.todoList.filter((todo) => !todo.isCompleted)
          .length,
        todoFilter: type,
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
    setTodosLS(todoList);
    this.render();
  };
  this.render = (
    { todoList: todoList, todoCount: todoCount, todoFilter: todoFilter } = {
      todoList: this.state.todoList,
      todoCount: this.state.todoCount,
      todoFilter: this.state.todoFilter,
    }
  ) => {
    this.todoList.setState(todoList);
    this.todoCount.setState(todoCount);
    this.todoFilter.setState(todoFilter);
  };
  try {
    if (!(this instanceof App)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.init();
  } catch {}
}
