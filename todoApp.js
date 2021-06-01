import TodoInput from "./src/component/todoInput.js";
import { TodoItem } from "./src/component/todoItem.js";
import { generateTodos } from "./src/utils/util.js";

// 데이터가 업데이트 될 때 마다 render 함수가 새로 호출되나?
export default function TodoApp() {
	console.log('reload');

	// LocalStorage에 할 일 목록이 있다면 가져오기
	this.todoItems = generateTodos(JSON.parse(localStorage.getItem("items")));
	console.log(this.todoItems);

	// 현재 todoItems 배열 데이터 기반으로 TodoList 컴포넌트 생성
	

	// 화면 렌더링
	this.render = () => {
		
	}
	
	this.add = contents => {
		const newTodoItem = new TodoItem(0, contents);
		this.todoItems.push(newTodoItem);
		console.log(this.todoItems);
	}
	
}

new TodoApp();


