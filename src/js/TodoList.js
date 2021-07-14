export default function TodoList({ $app, initialState, onToggle, onDelete }) {
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
    const $viewnode = e.target.closest('.view');
    const { nodeId } = $viewnode.dataset;

    if ($node.className == 'toggle') {
      this.toggleTodoItem(parseInt(nodeId));
    }
    if ($node.className == 'destroy') {
      this.deleteTodoItem(parseInt(nodeId));
    }
  });
  this.toggleTodoItem = (nodeId) => {
    onToggle(nodeId);
  };
  this.deleteTodoItem = (nodeId) => {
    onDelete(nodeId);
  };
  this.render = () => {
    const todoTemplate = `${this.state
      .map(
        (todo, idx) =>
          `<li  class="${todo.state === 'complete' ? 'completed' : ''}">
          <div class="view" data-node-id=${todo.idx} >
            <input class="toggle" type="checkbox" />
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
