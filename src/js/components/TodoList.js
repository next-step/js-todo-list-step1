import { SELECTOR, NODE_NAME, CLASS_NAME } from '../utils/constant.js';
import { todoListTemplate } from '../utils/templates.js';
import Observer from '../libs/Observer.js';

class TodoList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = document.querySelector(SELECTOR.TODO_LIST);
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    this.container.addEventListener('click', ({ target }) => {
      const $li = target.closest(NODE_NAME.LIST);
      const id = +$li.dataset.id;
      const targetClass = target.className;
      if (targetClass === CLASS_NAME.TOGGLE) {
        this.onToggleComplete(id, $li, target);
      } else if (targetClass === SELECTOR.DESTROY) {
        this.onRemoveTodo(id);
      }
    });

    this.container.addEventListener('dblclick', ({ target }) => {
      if (target.className === NODE_NAME.LABEL) {
        this.onEditMode(target);
      }
    });

    this.container.addEventListener('keyup', ({ key }) => {
      if (key === 'Escape') {
        const $editList = this.container.querySelectorAll(SELECTOR.EDIT_INPUT);
        const $activeInput = Array.from($editList).find(
          (element) => element === document.activeElement,
        );
        $activeInput && this.offEditMode($activeInput); // 현재 active 한 input이 있을 경우
      }
    });
  }

  /**
   * @param {EventTarget} target
   */
  onEditMode(target) {
    const $li = target.closest(NODE_NAME.LIST);
    // 이미 complete 된 투두는 변경 불가
    if ($li.className !== CLASS_NAME.COMPLETED) {
      const $value = target.closest(NODE_NAME.LABEL).innerText;
      const $input = $li.querySelector(SELECTOR.EDIT_INPUT);
      $li.className += CLASS_NAME.EDITING;
      $input.value = $value;
    }
  }

  /**
   * @param {EventTarget} target
   */
  offEditMode(target) {
    const $li = target.closest(NODE_NAME.LIST);
    const $label = $li.querySelector(NODE_NAME.LABEL);
    const $value = target.value;
    if ($value !== $label.innerText) {
      $label.innerText = $value;
      this.onUpdateTodo(+$li.dataset.id, $value);
    }
    $li.className = '';
  }

  /**
   * @param {number} id
   * @param {string} newTitle
   */
  onUpdateTodo(id, newTitle) {
    const updatedData = this.store.originData.map((data) => {
      if (data.id === id) {
        return { id, title: newTitle };
      }
      return data;
    });
    this.store.setOriginData(updatedData);
  }

  /**
   * @param {number} id
   * @param {Element} $li
   * @param {EventTarget} target
   */
  onToggleComplete(id, $li, target) {
    target.toggleAttribute('checked');
    $li.className === CLASS_NAME.COMPLETED
      ? ($li.className = '')
      : ($li.className = CLASS_NAME.COMPLETED);

    const updatedData = this.store.originData.map((data) => {
      if (data.id === id) {
        return { ...data, complete: !data.complete };
      }
      return data;
    });
    this.store.setOriginData(updatedData);
  }

  /**
   * @param {number} id
   */
  onRemoveTodo(id) {
    const updatedRenderData = this.store.renderData.filter(
      (data) => data.id !== id,
    );
    const updatedOriginData = this.store.originData.filter(
      (data) => data.id !== id,
    );
    this.store.setOriginData(updatedOriginData);
    this.store.setRenderData(updatedRenderData);
  }

  update() {
    this.render();
  }

  render() {
    this.container.innerHTML = todoListTemplate(this.store.renderData);
  }
}

export default TodoList;
