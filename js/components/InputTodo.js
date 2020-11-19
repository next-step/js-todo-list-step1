import { createNewId } from "../utils/createId.js";

function InputTodo(target, addTodo) {
  this.target = target;
  this.addTodo = addTodo;

  const SUBMIT_KEY = "Enter";

  const input = this.target.querySelector(".new-todo");
  const todoList = this.target.querySelector(".todo-list");

  target.addEventListener(
    "keypress",
    (this.handleSubmit = e => {
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

        this.addTodo(todoObj);
        input.value = "";
      }
    })
  );

  //double click doesn't work.. why...?
  todoList.addEventListener(
    "dblclick",
    (this.handleDblClick = e => {
      console.log(e);
    })
  );
}

export default InputTodo;
