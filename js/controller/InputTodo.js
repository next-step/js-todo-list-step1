import { createNewId } from "../utils/createId.js";

function InputTodo(target, addTodo) {
  const SUBMIT_KEY = "Enter";

  const input = target.querySelector(".new-todo");
  const handleSubmit = e => {
    if (e.code === SUBMIT_KEY) {
      if (input.value === "") {
        alert("한글자 이상 입력해주세요");
        return;
      }
      const todoObj = {
        text: input.value,
        id: createNewId(),
        state: ""
      };

      addTodo(todoObj);
      input.value = "";
    }
  };

  const todoList = target.querySelector(".todo-list");
  //동작을 안함.. 왜그럴까요..
  const handleDblClick = e => {
    console.log(e);
  };

  target.addEventListener("keypress", handleSubmit);
  todoList.addEventListener("dblclick", handleDblClick);
}

export default InputTodo;
