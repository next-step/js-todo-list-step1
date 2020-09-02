class Count {
  $count = document.querySelector('.todo-count');
  constructor(count) {
    this.count = count;
    this.render();
  }

  setCount = (count) => {
    this.count = count;
    this.render();
  };

  render = () => {
    this.$count.querySelector('strong').innerText = this.count;
  };
}

export default Count;
