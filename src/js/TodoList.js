export default function TodoList({
  $app,
  initialState,
  onToggle,
  onDelete,
  onEdit,
}) {
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
    if ($node.className === 'toggle') {
      const $dataNode = e.target.closest('.view').parentNode;
      const { nodeId } = $dataNode.dataset;
      this.toggleTodoItem(parseInt(nodeId));
    }
    if ($node.className === 'destroy') {
      const $dataNode = e.target.closest('.view').parentNode;
      const { nodeId } = $dataNode.dataset;
      this.deleteTodoItem(parseInt(nodeId));
    }
    //1) 엔터 누르면 셋스테이트 변경
    //2) 이에스씨 누르면 그냥 종료
    if ($node.className === 'edit') {
      const $dataNode = e.target.parentNode;
      const { nodeId } = $dataNode.dataset;
      $node.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          this.editTodoItem(parseInt(nodeId), true, $node.value);
        } else if (e.keyCode === 27) {
          this.editTodoItem(parseInt(nodeId), false, '');
        }
      });
    }
  });

  this.$target.addEventListener('dblclick', (e) => {
    const $node = e.target;
    if ($node.className !== 'edit') {
      const $dataNode = e.target.closest('.view').parentNode;
      const { nodeId } = $dataNode.dataset;

      if ($node.className === 'label') {
        this.editTodoItem(parseInt(nodeId), false, '');
      }
    }
  });
  this.toggleTodoItem = (nodeId) => {
    onToggle(nodeId);
  };
  this.deleteTodoItem = (nodeId) => {
    onDelete(nodeId);
  };
  this.editTodoItem = (nodeId, isEdit, newContent) => {
    onEdit(nodeId, isEdit, newContent);
  };
  this.render = () => {
    const todos = this.state;
    const todoTemplate = `${todos
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
    this.$target.innerHTML = todoTemplate;
  };
}
