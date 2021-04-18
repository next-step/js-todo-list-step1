import { $ } from "../util/util.js";

export default function TodoCount({ onClick }) {
  this.itemCount = 0;

  this.setState = (count) => {
    this.itemCount = count;
    this.render();
  };

  this.render = () => {
    const $todoCount = $(".todo-count");
    $todoCount.innerHTML = `총 <strong>${this.itemCount}</strong> 개`;
  };

  $(".filters").addEventListener("click", onClick);
}
