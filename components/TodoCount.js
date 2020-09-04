class TodoCount {
  constructor() {
    this.$count = document.querySelector('.todo-count');
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
