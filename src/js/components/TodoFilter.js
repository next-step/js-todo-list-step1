export default function TodoFilter({ $app, initialState, onFilter }) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'count-container';
  $app.appendChild(this.$target);
  const $nodeTodoFilter = this.$target;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $nodeTodoFilter.addEventListener('click', (e) => {
    const $node = e.target;

    if ($node.className === 'completed') {
      onFilter('completed');
    } else if ($node.className === 'active') {
      onFilter('active');
    } else {
      onFilter('all selected');
    }
  });

  this.render = () => {
    const todoTotalCount = this.state.isFilter
      ? this.state.filterTodoes.length
      : this.state.todoes.length;
    const todoFilterTemplate = `
      <span class="todo-count">총 <strong>${todoTotalCount}</strong> 개</span>
      <ul class="filters">
        <li>
          <a class="all selected" href="#">전체보기</a>
        </li>
        <li>
          <a class="active" href="#active">해야할 일</a>
        </li>
        <li>
          <a class="completed" href="#completed">완료한 일</a>
        </li>
      </ul>`;
    $nodeTodoFilter.innerHTML = todoFilterTemplate;
  };
}
