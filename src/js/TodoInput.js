export default function TodoInput({ $app, initialState, onAdd }) {
  this.state = initialState;
  this.$target = document.createElement('input');
  this.$target.id = 'new-todo-title';
  this.$target.className = 'new-todo';
  this.$target.placeholder = '할일 추가하기';
  this.$target.autofocus;
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.$target.addEventListener('keydown', (e) => {
    this.addTodoItem(e);
  });

  this.addTodoItem = (e) => {
    const $newTodoTarget = e.target;

    if (e.keyCode === 13) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = '';
    }
  };
}
