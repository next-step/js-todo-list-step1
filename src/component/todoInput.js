// 입력 받는 컴포넌트
export default function TodoInput({ onAdd }) {
    console.log("input실행");
    const $todoInput = document.querySelector("#new-todo-title");
  
    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));
    
    this.addTodoItem = event => {
      const $newTodoTarget = event.target;
      console.log("타이핑중");
      if (event.key === "Enter") {
        console.log("엔터 눌림");
        onAdd($newTodoTarget.value);
        $newTodoTarget.value = "";
      }
    };

    this.inValid = (event) => {
      if (event.keyCode == 13) {
        return true;
      }
    }
  }