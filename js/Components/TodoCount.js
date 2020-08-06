function TodoCount({ $target }) {
  this.init = () => {
    this.$target = $target;

    this.render();
  };

  this.setState = (nextState) => {};

  this.render = () => {};

  this.init();
}

export default TodoCount;
