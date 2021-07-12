export default function TodoInput({ $app, onAdd }) {
  this.$target = document.createElement('input');
  this.$target.id = 'new-todo-title';
  this.$target.className = 'new-todo';
  this.$target.placeholder = '할일 추가하기';
  this.$target.autofocus;
  $app.appendChild(this.$target);

  this.$target.addEventListener('keydown', (e) => {
    this.addTodoItem(e);
  });

  this.addTodoItem = (e) => {
    const $newTodoTarget = e.target;

    if (e.code === 'Enter') {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = '';
    }
  };
  this.setState = (nextState) => {
    this.setState = nextState;
    this.render();
  };

  this.render = () => {};
}
