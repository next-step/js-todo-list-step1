import { createNewId } from "../utils/createId.js";

function InputTodo(target, addTodo) {
  console.log("input todo");
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
        id: createNewId()
      };
      addTodo(todoObj);
      input.value = "";
    }
  };

  target.addEventListener("keypress", handleSubmit);
}

export default InputTodo;
