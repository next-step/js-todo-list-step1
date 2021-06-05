export default class TodoCount {
  constructor() {
    this.count = 0;
  }

  setState(updatedCount) {
    this.count = updatedCount;
    this.render();
  }

  render() {
    console.log('count render');
  }
}