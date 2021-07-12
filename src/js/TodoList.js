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
  this.$target.addEventListener('click', (e) => {});

  this.$target.addEventListener('click', (e) => {
    console.log(e.target.className);
    console.log(e);
    const $node = e;
    const { nodeId } = $node.dataset;
    console.log('nodeid', nodeId);
  });
  this.toggleTodo = (e) => {};

  this.render = () => {
    const todoTemplate = `${this.state
      .map(
        (todo, idx) =>
          `<li >
          <div class="view">
            <input class="toggle" type="checkbox" data-node-id=${todo.idx} />
            <label class="label">${todo.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit " value=${todo.content}/>
        </li>`
      )
      .join('')}`;
    this.$target.innerHTML = todoTemplate;
  };
}
