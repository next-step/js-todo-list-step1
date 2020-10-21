class TodoCount {
  count;

  constructor($target) {
    this.$count = $target;
    this.count = 0;
  }

  setCount = (count) => {
    this.count = count;
    this.render();
  };

  render = () => {
    this.$count.querySelector('strong').innerText = this.count;
  };
}

export default TodoCount;
