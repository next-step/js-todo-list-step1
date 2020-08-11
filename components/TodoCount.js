export default function TodoCount({ elementId, todoCount }) {
  this.init = () => {
    if (!(this instanceof TodoCount)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.$todoCount = document.querySelector(`.${elementId}`);
    this.todoCount = todoCount;
  };
  this.render = () => {
    this.$todoCount.innerHTML = `총 <strong>${this.todoCount}</strong> 개`;
  };
  this.setState = (todoCount) => {
    this.todoCount = todoCount;
    this.render();
  };
  this.init();
  this.render();
}
