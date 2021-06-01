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

	this.setState = () => {
		localStorage.setItem("items", JSON.stringify(this.todoItems));
    this.todoList.setState(this.todoItems);
  };

	// 화면 렌더링
	this.render = () => {
		this.todoInput = new TodoInput(this);
		this.setState();
	}
	
	// 학습 자료에 있는 코드는 add 함수를 TodoInput 컴포넌트에 넘겨줘서 TodoInput 인스턴스 안에서 실행하는데
	// TodoInput 인스턴스 내에서 더 많은 함수를 실행해야할 수 도 있는 상황을 대비해 (확장성 고려) this 를 넘겨준다. 
	this.add = contents => {
		const newTodoItem = new TodoItem(0, contents);
		this.todoItems.push(newTodoItem);
		this.setState();
	}
	
}

const todoApp = new TodoApp();
todoApp.render();


