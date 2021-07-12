import { TODOITEMS, KEY_ENTER, KEY_ESC } from "./../constants/constants.js";

export default function ChangeTodos(setState) {
  this.setState = setState;
  this.$todoList = document.querySelector("#todo-list");
  this.todoItems = [];

  this.changeStatus = ({ target }) => {
    this.todoItems = JSON.parse(localStorage.getItem(TODOITEMS));

    if (target.classList.contains("toggle")) {
      this.toggleTodo(target);
    } else if (target.classList.contains("destroy")) {
      this.deleteTodo(target);
    }
  };

  //완료된 상태를 boolean값으로 반대값으로 변화시킴
  this.toggleTodo = (target) => {
    this.todoItems.map((todo) => {
      //troubleShooting: todo.id는 정수값이기 때문에 === 라고 했을 때 다르게 나온다. 그래서 String으로 바꿔주는 것이 좋겠다.
      if (target.closest("li").id === todo.id) {
        todo.completed = !todo.completed;
      }
    });
    this.setState(this.todoItems);
  };

  //선택한 item의 id와 다른 것들만 filter해서 새로운 데이터를 만듦
  this.deleteTodo = (target) => {
    this.todoItems = this.todoItems.filter((todo) => {
      //troubleShooting: return을 해줘야 한다. 아주 간단한 걸로 시간을 많이 썼다. 예문을 잘 보고 적용해야 한다.
      return todo.id !== target.closest("li").id;
    });
    this.setState(this.todoItems);
  };

  //더블 클릭했을 때 li 태그에 editing 클래스 추가
  this.editTodo = ({ target }) => {
    this.todoItems = JSON.parse(localStorage.getItem(TODOITEMS));

    if (target.classList.contains("label")) {
      target.closest("li").classList.add("editing");
      //자동으로 편집 input창 autofocus 설정
      target.parentNode.nextSibling.nextSibling.focus();
    }
  };

  //편집을 완료한 후 데이터 최신화 및 취소
  this.finishEdit = ({ target, key }) => {
    if (key === KEY_ENTER && target.value.trim()) {
      this.todoItems.map((todo) => {
        if (target.closest("li").id === todo.id) {
          todo.content = target.value;
        }
      });
      target.closest("li").classList.remove("editing");
      this.setState(this.todoItems);
    } else if (key === KEY_ESC) {
      target.closest("li").classList.remove("editing");
    }
  };

  this.$todoList.addEventListener("click", this.changeStatus);
  this.$todoList.addEventListener("dblclick", this.editTodo);
  this.$todoList.addEventListener("keyup", this.finishEdit);
}
