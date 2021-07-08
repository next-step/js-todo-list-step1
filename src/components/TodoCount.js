import { ALL, ACTIVE, COMPLETED } from '../constants/todoState.js';

export default class TodoCount {
  constructor({ $app, initialState, changeShow }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'count-container';

    this.$target.addEventListener('click', ({ target }) => {
      if (target.closest('a')) changeShow(target.id);
    });

    $app.appendChild(this.$target);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
        <span class="todo-count">총 <strong>${
          this.state.count
        }</strong> 개</span>
        <ul class="filters">
        <li>
            <a id="all" ${
              this.state.show === ALL ? 'class="selected"' : ''
            }href="/#">전체보기</a>
        </li>
        <li>
            <a id="active" ${
              this.state.show === ACTIVE ? 'class="selected"' : ''
            }href="#active">해야할 일</a>
        </li>
        <li>
            <a id="completed" ${
              this.state.show === COMPLETED ? 'class="selected"' : ''
            }href="#completed">완료한 일</a>
        </li>
        </ul>
    `;
  }
}
