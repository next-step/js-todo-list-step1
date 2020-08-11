export default function TodoInput({ elementId, addTodos }) {
  this.init = () => {
    if (!(this instanceof TodoInput)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.$todoInput = document.getElementById(elementId);
    this.addTodos = addTodos;
  };
  this.enterHandler = (evt) => {
    if (evt.key === "Enter") {
      this.addTodos({
        content: evt.target.value,
      });
      evt.target.value = "";
      evt.target.focus();
    }
  };
  this.bindEventListener = () => {
    this.$todoInput.addEventListener("keydown", this.enterHandler);
  };
  this.init();
  this.bindEventListener();
}
