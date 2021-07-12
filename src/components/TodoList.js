import TodoCount from "./TodoCount.js";
import { ALL, ACTIVE, COMPLETED } from "../constants/constants.js";

/* todoList를 보여주는 컴포넌트 */
export default function TodoList() {
  this.todoItems = [];
  this.todoCount = new TodoCount();
  this.$todoList = document.querySelector("#todo-list");
  this.$filters = document.querySelector(".filters");

  //최신화된 item을 받아와서 render함수에 전달
  this.setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
    this.todoCount.setCount(this.todoItems);
    /* 예를 들어 해야 할 일 탭에서 아이템을 삭제하거나 
       변경하면 전체보기로 넘어가는 문제가 있다 */
  };

  //아이템 하나당 html 템플릿을 추가해서 화면에 보여주기
  this.render = (items) => {
    this.$todoList.innerHTML = ""; //원래 있었던 html을 전부 없앤 후에 다시 갱신한다
    items.map((todo) => {
      this.$todoList.insertAdjacentHTML(
        "beforeend",
        this.todoItemTemplate(todo)
      );
    });
    // const template = items.map(this.todoItemTemplate);
    // this.$todoList.insertAdjacentHTML("beforeend", template);
    // troubleShooting: 위 두 줄과 같이 코딩을 했을 때는 item 사이에 ',' 가 포함되는 문제가 있었다.
  };

  //todoItem 리스트 하나의 html 템플릿
  this.todoItemTemplate = (item) => {
    return `<li id="${item.id}" class="${item.completed && COMPLETED}">
    					<div class="view">
      					<input class="toggle" type="checkbox" ${
                  item.completed === true ? "checked" : ""
                }/>
      					<label class="label">${item.content}</label>
      					<button class="destroy"></button>
    					</div>
    					<input class="edit" value=""/>
  					</li>`;
  };

  //해야할 일만 보여주기
  this.renderActive = (items) => {
    const activeItems = items.filter((todo) => {
      if (!todo.completed) {
        return true;
      }
    });
    this.render(activeItems);
    this.todoCount.setCount(activeItems);
  };

  //완료한 일만 보여주기
  this.renderCompleted = (items) => {
    const completedItems = items.filter((todo) => {
      if (todo.completed) {
        return true;
      }
    });
    this.render(completedItems);
    this.todoCount.setCount(completedItems);
  };

  //필터링 된 아이템들만 선택하기
  /* selected 클래스를 추가해서 강조되는 css가 먹게 해야 하는데
    이 부분을 아직 구현하지 못했다.  */
  this.filterTodo = ({ target }) => {
    switch (target.className) {
      case ALL:
        this.render(this.todoItems);
        break;
      case ACTIVE:
        this.renderActive(this.todoItems);
        break;
      case COMPLETED:
        this.renderCompleted(this.todoItems);
        break;
    }
  };

  this.$filters.addEventListener("click", this.filterTodo);
}
