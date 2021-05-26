export class TodoHeader {
  constructor($target, props) {
    this.$target = $target;
    this.state = props;
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    this.element = document.createElement("header");
    this.element.innerHTML = `
            <h1>${this.state}</h1>
        `;
    this.$target.appendChild(this.element);
  }
}
