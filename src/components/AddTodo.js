export default class AddTodo {
  constructor($newTodoTitle, loadTodo) {
    this.loadTodo = loadTodo;
    $newTodoTitle.addEventListener("keyup", this.addTodo);
    //keydown으로 했을 경우 누르고 있으면 계속 코드가 작동됨 비효율.
  }

  //구조분해할당을 이용해서 event객체의 target 값과 key 값을 받아오는 것이다.
  addTodo = ({ target, key }) => {
    //space로만 이루어져있으면 안 되도록 하고 싶다.
    if (key === "Enter" && target.value) {
      this.todos = JSON.parse(localStorage.getItem("todos")) ?? [];
      //todos 배열에 계속 넣어주면서 목록을 늘린 후에 localStorage에 최신화 시켜주는 거구나 같은 이름으로
      this.todos.push({
        id: String(Date.now()),
        title: target.value,
        completed: false,
      });
      target.value = "";
      localStorage.setItem("todos", JSON.stringify(this.todos));
      this.loadTodo();
    }
  };
}
