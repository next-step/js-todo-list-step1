import { ALL, ACTIVE, COMPLETED } from "./constants/state.js";
import AddTodo from "./components/AddTodo.js";

//여기서 export가 꼭 있어야만 되는건가?
//내 생각엔 html에서 이 파일을 직접 가리키고 있으니까 export가 없어도 될 것 같은데
//그런데 다시 생각해보니까 다른 파일에서 여기 정보를 써야한다면 필요하다.
export default class App {
  constructor() {
    this.$todoList = document.querySelector("#todo-list");
    this.$newTodoTitle = document.querySelector("#new-todo-title");

    this.addTodo = new AddTodo(this.$newTodoTitle, this.loadTodo);

    this.loadTodo();
  }

  //매개변수 todo가 어떤 형태로 들어오고 그 값들은 어떤 것인가?
  todoTemplate = (todo) => {
    return `<li id=${todo.id} class=${
      todo.completed /*todo.completed가 어떻게 오려나?*/ && "completed"
    }>
			<div class="view">
				<input class="toggle" type="checkbox" id=${todo.id} ${
      todo.completed && "checked"
    }/>
				<lable class="label">${todo.title}</label>
				<button class="destroy" id=${todo.id}></button>
			</div>
			<input class="edit" value=${todo.title}/>				
		</li>`;
  };

  viewAll = () => {
    //todos가 도대체 무엇일까?
    this.todos.map((todo) => {
      this.$todoList.insertAdjacentHTML("beforeend", this.todoTemplate(todo));
    });
  };

  loadTodo = (option = ALL) => {
    //localStorage 일단 생략
    switch (option) {
      case ALL:
        this.viewAll();
        break;
      // case ACTIVE:
      //   this.viewActive();
      //   break;
      // case COMPLETED:
      //   this.viewCompleted();
      //   break;
    }
    //updateTodoCount 생략
  };
}

window.onload = () => {
  new App();
  //왜 클래스의 생성자를 이용해서 이 모든 함수들을 실행했을까?
  //이 설계의 근거는 무엇일까에 대해서 생각해봐야 한다.
  //onload 에 함수를 실행하면 되는것 아닌가?
  //클래스는 syntatic sugar라는 잘못된 말이 있는데 이 경우에도 그런건가
};
