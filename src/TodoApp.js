import TodoCount from "./components/TodoCount.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import TodoItem from "./components/TodoItem.js";

/* 부모 컴포넌트 */
export default function TodoApp() {
  this.todoItems = []; //한 곳에서만 todoItems 데이터를 관리한다.

  this.todoList = new TodoList();

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

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
//이런 식으로 하면 업데이트된 아이템이 render될 것 같은데?
