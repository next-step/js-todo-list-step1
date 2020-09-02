class Count {
  $countContainer = document.querySelector('.count-container');
  constructor(count) {
    this.count = count;
    this.render();
  }

  setCount = (count) => {
    console.log('hi');
    this.count = count;
    this.render();
  };

  render = () => {
    this.$countContainer.querySelector(
      '.todo-count>strong'
    ).innerText = this.count;
  };
}

export default Count;
