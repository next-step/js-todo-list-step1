export default function ChangeTodos(setState) {
  this.setState = setState;
  this.$todoList = document.querySelector("#todo-list");
  this.todoItems = [];

  this.changeStatus = ({ target }) => {
    this.todoItems = JSON.parse(localStorage.getItem('todoItems'));

    if (target.classList.contains('toggle')) {
      this.toggleTodo(target);
    } else if (target.classList.contains('destroy')) {
      this.deleteTodo(target);
    }
  };

  this.toggleTodo = (target) => {
    this.todoItems.map((todo) => {
      //troubleShooting: todo.id는 정수값이기 때문에 === 라고 했을 때 다르게 나온다. 그래서 String으로 바꿔주는 것이 좋겠다.
      if (target.closest('li').id === todo.id) {
        todo.completed = !todo.completed;
      }
    });
    this.setState(this.todoItems);
  };

  this.deleteTodo = (target) => {
    const filterdItems = this.todoItems.filter((todo) => {
      //troubleShooting: return을 해줘야 한다. 아주 간단한 걸로 시간을 많이 썼다. 예문을 잘 보고 적용해야 한다.
      return todo.id !== target.closest('li').id
    });
    this.setState(filterdItems);
  }

  //autofocus 어떻게 구현해볼까?
  this.editTodo = ({ target }) => {
    if (target.classList.contains('label')) {
      const oldValue = target.innerText;

      target.closest('li').classList.add('editing');


    }
  }

  this.finishEdit = ({ target, key }) => {
    if (key === 'Enter') {

      target.closest('li').classList.remove('editing');
    } else if (key === 'Escape') {


      // target.value = oldValue;
      target.closest('li').classList.remove('editing');
      console.log('esc');
    }
  }

  this.$todoList.addEventListener("click", this.changeStatus);
  this.$todoList.addEventListener("dblclick", this.editTodo);
  this.$todoList.addEventListener("keyup", this.finishEdit);
}
