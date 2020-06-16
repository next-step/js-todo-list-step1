export default class TodoInput {
  constructor({ data, $target, onInput }) {
    (this.data = data), (this.$target = $target);

    this.$target.addEventListener("click", (e) => {
      e.target.value = "";
    });
    
    this.$target.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        if (e.target.value) {
          onInput(e.target.value);
          e.target.value = "";
        }
      }
    });
  }
}
