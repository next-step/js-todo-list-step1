class Count {
  $count = document.querySelector('.todo-count');
  count = 0;

  setCount = (count) => {
    this.count = count;
    this.render();
  };

  render = () => {
    this.$count.querySelector('strong').innerText = this.count;
  };
}

export default Count;
