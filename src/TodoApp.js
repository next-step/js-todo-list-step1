import TodoCount from "./components/TodoCount.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoItem from "./components/TodoItem.js";
import ChangeTodos from "./components/ChangeTodos.js";

/* 부모 컴포넌트 */
export default function TodoApp() {
  //한 곳에서만 todoItems 데이터를 관리한다.
  this.todoItems = JSON.parse(localStorage.getItem("todoItems")) ?? [];
  this.todoList = new TodoList();

  this.setState = (updatedItems) => {
    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
    this.todoList.setState();
  };

  this.changeTodos = new ChangeTodos(this.setState);
  //troubleShooting: 이 선언이 함수 선언 위에 있으면 undefined로 넘어간다.

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
