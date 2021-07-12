export default function TodoList({ $app, initialState, onToggle }) {
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

  this.$target.addEventListener('click', (e) => {
    const $node = e.target;
    const { nodeId } = $node.dataset;
    if (nodeId) {
      this.toggleTodoItem(nodeId);
    }
  });
  this.toggleTodoItem = (nodeId) => {
    onToggle(nodeId);
  };

  this.render = () => {
    const todoTemplate = `${this.state
      .map(
        (todo, idx) =>
          `<li class="${todo.state === 'complete' ? 'completed' : ''}">
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
