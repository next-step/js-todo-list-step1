/* 입력받는 컴포넌트 */
export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  const addTodoItem = ({ target, key }) => {
    //공백으로만 이루어진 문자열은 todoItem으로 유효하지 않음
    if (key === "Enter" && target.value.trim()) {
      onAdd(target.value);
      target.value = "";
    } else if (key === "Escape") {
      target.value = "";
    }
  };

  $todoInput.addEventListener("keyup", addTodoItem);
  // troubleshooting: 위에 먼저 함수를 정의한 이후에 아래에 이벤트리스너를 위치시키니까 잘 작동한다.
}
