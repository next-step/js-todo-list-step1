export default function TodoList({
  $app,
  initialState,
  onToggle,
  onDelete,
  onEdit,
}) {
  this.state = initialState;
  this.$target = document.createElement('ul');
  this.$target.className = 'todo-list';
  this.$target.id = 'todo-list';
  $app.appendChild(this.$target);
  const $nodeTodoList = this.$target;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $nodeTodoList.addEventListener('click', (e) => {
    const $node = e.target;

    if ($node.className === 'toggle') {
      this.toggleTodoItem($node);
    }
    if ($node.className === 'destroy') {
      this.deleteTodoItem($node);
    }

    if ($node.className === 'edit') {
      this.editTodoItem($node);
    }
  });

  $nodeTodoList.addEventListener('dblclick', (e) => {
    const $node = e.target;
    this.editTodoItem($node);
  });

  this.toggleTodoItem = ($node) => {
    const { nodeId } = $node.closest('.view').parentNode.dataset;
    onToggle(parseInt(nodeId));
  };

  this.deleteTodoItem = ($node) => {
    const { nodeId } = $node.closest('.view').parentNode.dataset;
    onDelete(parseInt(nodeId));
  };

  this.editTodoItem = ($node) => {
    if ($node.className === 'edit') {
      const { nodeId } = $node.parentNode.dataset;
      $node.addEventListener('keydown', (e) => {
        //Enter key 입력
        if (e.keyCode === 13) {
          onEdit(parseInt(nodeId), true, $node.value);
        } //esc key 입력
        else if (e.keyCode === 27) {
          onEdit(parseInt(nodeId), false, '');
        }
      });
    } else {
      const { nodeId } = $node.closest('.view').parentNode.dataset;
      if ($node.className === 'label') {
        onEdit(parseInt(nodeId), false, '');
      }
    }
  };

  this.render = () => {
    const { todoes, isFilter, filterTodoes } = this.state;
    const viewTodoes = isFilter ? filterTodoes : todoes;

    const todoTemplate = `${viewTodoes
      .map(
        (todo, idx) =>
          `<li class="${todo.state === 'completed' ? 'completed' : ''} ${
            todo.state === 'editing' ? 'editing' : ''
          }" data-node-id="${todo.idx}">
          <div class="view"  >
            <input class="toggle" type="checkbox" />
            <label class="label">${todo.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todo.content}"/>
        </li>`
      )
      .join('')}`;
    $nodeTodoList.innerHTML = todoTemplate;
  };
}
