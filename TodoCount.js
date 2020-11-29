export default class TodoCount {
  $target = null;
  data = null;
  constructor({ $target, data }) {
    this.$target = $target.querySelector(".todo-count");
    this.data = data;
    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    this.$target.innerHTML = `총 <strong>${this.data.count}</strong> 개`;
  }
}
