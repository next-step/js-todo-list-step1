import { SELECTOR } from '../utils/constant.js';
import { STATUS } from '../utils/constant.js';
import { todoItem } from '../utils/data.js';

class TodoInput {
  constructor(store) {
    this.container = document.querySelector(SELECTOR.TODO_INPUT);
    this.store = store;
    this.bindEvent();
  }

  // 필요한 이벤트 바인딩
  bindEvent() {
    const form = document.querySelector(SELECTOR.TODO_FORM);
    form.addEventListener('submit', (e) => this.onSubmit(e));
  }

  /**
   * @param {Event} e
   */
  onSubmit(e) {
    e.preventDefault();
    const newTodo = todoItem(this.container.value); // TodoData 가공
    this.container.value = ''; // value 값 초기화
    const todoData = [...this.store.originData, newTodo];
    this.store.setOriginData(todoData); // DataBase에 저장

    // 현재 status 가 all이거나, Active 인 경우 render data에도 추가
    const status = this.store.status;
    if (status !== STATUS.COMPLETED) {
      const renderData = [...this.store.renderData, newTodo];
      this.store.setRenderData(renderData);
    }
  }
}
export default TodoInput;
