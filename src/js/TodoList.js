export default function TodoList({ $app, initialState }) {
  //렌더링할 DOM 생성

  this.state = initialState;

  this.$target = document.createElement('ul');
  this.$target.className = 'todo-list';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const todoTemplate = `${this.state
      .map((todo, idx) => `<li data-index="${idx}">${todo}</div>`)
      .join('')}`;
    this.$target.innerHTML = todoTemplate;
  };
}
