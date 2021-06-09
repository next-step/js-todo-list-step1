/* 입력받는 컴포넌트 */
export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", this.addTodoItem);

  this.addTodoItem = ({ target, key }) => {
    console.log("hi");
    //공백으로만 이루어진 문자열은 todoItem으로 유효하지 않음
    // if (key === "Enter" && target.value.trim()) {
    //   console.log("Enter! valid!");
    //   onAdd(target.value);
    //   target.value = "";
    // } else if (key === "Escape") {
    //   console.log("ESC! cancel!");
    // }
  };
}
