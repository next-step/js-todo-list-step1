export default class TodoCount {
  constructor({ $element, count }) {
    this.$element = $element;
    this.count = count;

    this.render();
  }

  render() {
    this.$element.innerHTML = `총 <strong>${this.count}</strong> 개`;
  }

  setState(newCount) {
    this.count = newCount;
    this.render();
  }
}
