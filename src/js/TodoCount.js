export default function TodoCount({ $app, initialState }) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'count-container';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const todoCountTemplate = `
      <span class="todo-count">총 <strong>${this.state}</strong> 개</span><ul class="filters">
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
    this.$target.innerHTML = todoCountTemplate;
  };
}
