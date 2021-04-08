import Observer from '../libs/Observer.js';
import { SELECTOR } from '../utils/constant.js';
import { todoCounterTemplates } from '../utils/templates.js';

class TodoCounter extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = document.querySelector(`.${SELECTOR.TODO_COUNTER}`);
    this.render();
  }

  update() {
    this.render();
  }

  render() {
    const counter = this.store.renderData.length;
    this.container.innerHTML = todoCounterTemplates(counter);
  }
}

export default TodoCounter;
