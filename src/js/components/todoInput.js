export class TodoInput {
  constructor($target, onKeyDown) {
    this.$target = $target;
    this.$target.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.value !== "") {
        onKeyDown(e.target.value);
        e.target.value = "";
      }
    });
  }
}
