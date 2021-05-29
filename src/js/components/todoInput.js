export class TodoInput {
  constructor($target, onKeyDown) {
    this.$target = $target;
    this.$target.addEventListener("keydown", (e) => {
      const value = e.target.value.trim();
      if (e.key === "Enter") {
        if (value) {
          onKeyDown(value);
        }
        e.target.value = "";
      }
    });
  }
}
