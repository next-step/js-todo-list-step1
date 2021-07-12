export default function TodoList({ $app, initialState }) {
  //렌더링할 DOM 생성

  this.state = initialState;

  this.$target = document.createElement('ul');
  this.$target.className = 'todo-list';
  this.$target.id = 'todo-list';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const todoTemplate = `${this.state
      .map(
        (todo, idx) =>
          `<li>
          <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${todo}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${todo}/>
        </li>`
      )
      .join('')}`;
    this.$target.innerHTML = todoTemplate;
  };
}
