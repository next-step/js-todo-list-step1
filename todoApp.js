import TodoInput from "./src/component/todoInput.js";
import TodoList from "./src/component/todoList.js";
import { TodoItem } from "./src/component/todoItem.js";
import { generateTodos } from "./src/utils/util.js";

// 데이터가 업데이트 될 때 마다 render 함수가 새로 호출되나?
export default function TodoApp() {
	console.log('reload');

	// LocalStorage에 할 일 목록이 있다면 가져오기
	this.todoItems = generateTodos(JSON.parse(localStorage.getItem("items")));

	// todoList 컴포넌트 생성
	this.todoList = new TodoList(this);

	this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

	// 화면 렌더링
	this.render = () => {
		this.setState(this.todoItems);
	}
	
	this.add = contents => {
		const newTodoItem = new TodoItem(0, contents);
		this.todoItems.push(newTodoItem);
	}
	
}

const todoApp = new TodoApp();
todoApp.render();


