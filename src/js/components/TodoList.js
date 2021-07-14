import { FILTER_TYPES, TODO_ITEM_CLASS } from '../../utils/const.js';
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

    if ($node.className === TODO_ITEM_CLASS.TOGGLE) {
      this.toggleTodoItem($node);
    }
    if ($node.className === TODO_ITEM_CLASS.DESTROY) {
      this.deleteTodoItem($node);
    }

    if ($node.className === TODO_ITEM_CLASS.EDIT) {
      this.editTodoItem($node);
    }
  });

  $nodeTodoList.addEventListener('dblclick', (e) => {
    const $node = e.target;
    this.editTodoItem($node);
  });

  this.toggleTodoItem = ($node) => {
    const { nodeId } = $node.closest(`.${TODO_ITEM_CLASS.VIEW}`).parentNode
      .dataset;
    onToggle(parseInt(nodeId));
  };

  this.deleteTodoItem = ($node) => {
    const { nodeId } = $node.closest(`.${TODO_ITEM_CLASS.VIEW}`).parentNode
      .dataset;
    onDelete(parseInt(nodeId));
  };

  this.editTodoItem = ($node) => {
    if ($node.className === TODO_ITEM_CLASS.EDIT) {
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
      const { nodeId } = $node.closest(`.${TODO_ITEM_CLASS.VIEW}`).parentNode
        .dataset;
      if ($node.className === TODO_ITEM_CLASS.LABEL) {
        onEdit(parseInt(nodeId), false, '');
      }
    }
  };

  this.render = () => {
    const { todoes, filterState, todoesFiltered } = this.state;
    const viewTodoes =
      filterState === FILTER_TYPES.ALL ? todoes : todoesFiltered;

    const todoTemplate = `${viewTodoes
      .map(
        (todo, idx) =>
          `<li class="${
            todo.state === FILTER_TYPES.COMPLETE ? FILTER_TYPES.COMPLETE : ''
          }
           ${todo.state === 'editing' ? 'editing' : ''}" data-node-id="${
            todo.idx
          }">
          <div class="${TODO_ITEM_CLASS.VIEW}"  >
          <input class="${TODO_ITEM_CLASS.TOGGLE}" type="checkbox" />
          <label class="${TODO_ITEM_CLASS.LABEL}">${todo.content}</label>
          <button class="${TODO_ITEM_CLASS.DESTROY}"></button>
        </div>
        <input class="${TODO_ITEM_CLASS.EDIT}" value="${todo.content}"/>
      </li>`
      )
      .join('')}`;
    $nodeTodoList.innerHTML = todoTemplate;
  };
}
