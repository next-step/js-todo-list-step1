import { setLocalStorage } from "../js/LocalStorageUtil.js";
import { makeLocalStorageObject } from "../js/makeLocalStorageObject.js";

let id_No = localStorage.length;
const storageObject = new makeLocalStorageObject();

// const saveTodos = () => {
//   $todos.addEventListener("keypress", onAddTodoHandle);
// };

export class TodoInput {
  constructor({ onAdd }) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener("keypress", (e) => this.saveTodos(e));
    this.onAdd = onAdd;
  }

  saveTodos = (e) => {
    if (e.keyCode === 13) {
      this.onAdd(e.target.value);
      e.target.value = "";
    }
  };
}
