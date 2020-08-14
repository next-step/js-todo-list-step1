function TodoCount($target, count) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  this.count = count | 0;

  this.setState = (nextCount) => {
    this.count = nextCount;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
        <span class="todo-count">총 <strong>${this.count}</strong> 개</span>
    `;
  };

  this.render();
}

export default TodoCount;
