export class TodoInput {
  constructor($target, onKeyPress) {
    this.$target = $target;
    this.$target.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.value !== "") {
        onKeyPress(e.target.value);
        e.target.value = "";
      }
    });
  }
}
