export default class TodoInput {
  constructor({ data, $target, onInput }) {
    (this.data = data), (this.$target = $target);

    this.$target.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        onInput(e.target.value);
        e.target.value = "";
      }
    });
  }
}
