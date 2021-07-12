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
    const template = `<h1>${this.state}</h1>`;
    this.$target.insertAdjacentHTML('beforeend', template);
  }
}

