import { SELECTOR } from '../utils/constant.js';
import { STATUS } from '../utils/constant.js';
import todoItemGenerator from '../utils/todoItemGenerator.js';

class TodoInput {
  constructor(store) {
    this.container = document.getElementById(SELECTOR.TODO_INPUT);
    this.store = store;
    this.bindEvent();
  }

  // 필요한 이벤트 바인딩
  bindEvent() {
    const form = document.getElementById(SELECTOR.TODO_FORM);
    form.addEventListener('submit', (e) => this.onSubmit(e));
  }

  /**
   * @param {Event} e
   */
  onSubmit(e) {
    e.preventDefault();
    const newTodo = todoItemGenerator(this.container.value);
    this.container.value = '';
    const todoData = [...this.store.originData, newTodo];
    this.store.setOriginData(todoData);
    const status = this.store.status;
    // 현재 status 가 all이거나, not completed 인 경우 render data에도 추가
    if (status !== STATUS.COMPLETED) {
      const renderData = [...this.store.renderData, newTodo];
      this.store.setRenderData(renderData);
    }
  }
}
export default TodoInput;
