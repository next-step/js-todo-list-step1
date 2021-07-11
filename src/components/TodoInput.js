export default class TodoInput {
  constructor({ onAdd }) {
    this.todoInput = document.querySelector('#new-todo-title');
    this.todoInput.addEventListener('keydown', (event) => this.addTodoItem(event, onAdd));
  }

  addTodoItem(event, onAdd){
    const $newTodoTarget = event.target;
    if(event.key !== "Enter") return
    if($newTodoTarget.value === "") return alert("할일을 입력해주세요.")
    onAdd($newTodoTarget.value);
    $newTodoTarget.value="";
  }
}
