import { ALL, ACTIVE, COMPLETED } from "./constants/state.js";
import TodoCount from "./components/TodoCount.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";

/* 부모 컴포넌트 */
export default class TodoApp {
  constructor() {
    this.todoItems = []; //한 곳에서만 todoItems 데이터를 관리한다.
  }

  render = () => {};
}

const todoApp = new TodoApp();
todoApp.render();
