import TodoInput from "./src/component/todoInput.js";
import TodoList from "./src/component/todoList.js";
import TodoCount from "./src/component/todoCount.js";
import { TodoItem } from "./src/component/todoItem.js";
import { generateTodos } from "./src/utils/util.js";

export default function TodoApp() {
	this.todoItems = generateTodos(JSON.parse(localStorage.getItem("items")));
	this.todoId = JSON.parse(localStorage.getItem("id")) ?? 0;

	this.todoInput = new TodoInput(this);
	this.todoList = new TodoList(this);
	this.todoCount = new TodoCount(this.todoList);

	this.setState = () => {
		localStorage.setItem("items", JSON.stringify(this.todoItems));
		localStorage.setItem("id", this.todoId);
    this.todoList.setState(this.todoItems);
  };

	// 화면 렌더링
	this.render = () => {
		this.setState();
	}
	
	// 학습 자료에 있는 코드는 add 함수를 TodoInput 컴포넌트에 넘겨줘서 TodoInput 인스턴스 안에서 실행하는데
	// TodoInput 인스턴스 내에서 더 많은 함수를 실행해야할 수 도 있는 상황을 대비해 this 를 넘겨준다. (확장성 고려) 
	this.add = contents => {
		const newTodoItem = new TodoItem(this.todoId++, contents);
		this.todoItems.push(newTodoItem);
		this.setState();
	}
	
	this.complete = targetId => {
		this.todoItems.find(item => targetId === item.id).complete();
		this.setState();
	}

	// 재사용
	this.changeStatus = (targetId) => {
		this.todoItems.find(item => targetId === item.id).editing();
		this.setState();
	}

	this.editItem = (targetId, contents) => {
		this.todoItems.find(item => targetId === item.id).edit(contents);
		this.changeStatus(targetId);
		this.setState();
	}

	// filter 함수는 새로운 배열을 반환
	this.delete = targetId => {
    this.todoItems = this.todoItems.filter(item => targetId !== item.id);
    this.setState();
  }
	
}

const todoApp = new TodoApp();
todoApp.render();
