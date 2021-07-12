import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoItem from "./components/TodoItem.js";
import ChangeTodos from "./components/ChangeTodos.js";
import { TODOITEMS } from "./constants/constants.js";

/* 부모 컴포넌트 */
export default function TodoApp() {
  //한 곳에서만 todoItems 데이터를 관리한다.
  this.todoItems = JSON.parse(localStorage.getItem(TODOITEMS)) ?? [];
  this.todoList = new TodoList();

  this.setState = (updatedItems) => {
    localStorage.setItem(TODOITEMS, JSON.stringify(updatedItems));
    this.todoItems = JSON.parse(localStorage.getItem(TODOITEMS));
    this.todoList.setState(this.todoItems);
  };

  //troubleShooting: 이 선언이 setState 함수 선언 위에 있으면 undefined로 넘어간다.
  new ChangeTodos(this.setState);

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });
}

const todoApp = new TodoApp();
todoApp.setState(todoApp.todoItems);
