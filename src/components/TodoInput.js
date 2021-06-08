/* 입력받는 컴포넌트 */
export default class TodoInput {
  constructor() {
    const $newTodoTitle = document.querySelector("#new-todo-title");

    $newTodoTitle.addEventListener("keyup", this.addTodoItem);
  }

  addTodoItem = ({ target, key }) => {
    //공백으로만 이루어진 문자열은 todoItem으로 유효하지 않음
    if (key === "Enter" && target.value.trim()) {
      console.log("Enter! valid!");
    } else if (key === "Escape") {
      console.log("ESC! cancel!");
    }
  };
}
