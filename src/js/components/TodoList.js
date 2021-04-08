import { SELECTOR } from '../utils/constant.js';
import { todoListTemplates } from '../utils/templates.js';
import Observer from '../libs/Observer.js';

class TodoList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = document.getElementById(SELECTOR.TODO_LIST);
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    this.container.addEventListener('click', (e) => {
      const $li = e.target.closest(SELECTOR.LIST);
      const targetClass = e.target.className;
      if (targetClass === SELECTOR.TOGGLE) {
      } else if (targetClass === SELECTOR.DESTROY) {
      }
    });

    this.container.addEventListener('dblclick', (e) => {
      const target = e.target;
      if (target.className === SELECTOR.LABEL) {
        this.onEditMode(e.target);
      }
    });

    this.container.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        const $editList = this.container.querySelectorAll(SELECTOR.EDIT_INPUT);
        const $activeInput = Array.from($editList).find(
          (element) => element === document.activeElement,
        );
        $activeInput && this.offEditMode($activeInput); // 현재 active 한 input이 있을 경우
      }
    });
  }

  onEditMode(target) {
    const $li = target.closest(SELECTOR.LIST);
    const $value = target.closest(SELECTOR.LABEL).innerText;
    const $input = $li.querySelector(SELECTOR.EDIT_INPUT);
    $li.className += SELECTOR.EDITING_MODE;
    $input.value = $value;
  }

  offEditMode(target) {
    const $li = target.closest(SELECTOR.LIST);
    const $label = $li.querySelector(SELECTOR.LABEL);
    const $value = target.value;
    if ($value !== $label.innerText) {
      $label.innerText = $value;
      this.onUpdateTodo(+$li.dataset.id, $value);
    }
    $li.className = '';
  }

  onUpdateTodo(id, newTitle) {
    const updatedData = this.store.renderData.map((data) => {
      if (data.id === id) {
        return { id, title: newTitle };
      }
      return data;
    });
    this.store.updatedData(updatedData);
  }

  update() {
    this.render();
  }

  render() {
    this.container.innerHTML = todoListTemplates(this.store.renderData);
  }
}

export default TodoList;
