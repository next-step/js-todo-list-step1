import { SELECTOR, NODE_NAME, CLASS_NAME } from '../utils/constant.js';
import { todoListTemplate } from '../utils/templates.js';
import Observer from '../libs/Observer.js';

// 관찰자
class TodoList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = document.querySelector(SELECTOR.TODO_LIST);
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    // 투두 토글 or 삭제
    this.container.addEventListener('click', ({ target }) => {
      const $li = target.closest(NODE_NAME.LIST);
      const id = +$li.dataset.id;
      const targetClassList = target.classList;

      if (targetClassList.contains(CLASS_NAME.TOGGLE)) {
        this.onToggleComplete(id, $li, target);
      } else if (targetClassList.contains(CLASS_NAME.DESTROY)) {
        this.onRemoveTodo(id);
      }
    });

    // 투두 수정
    this.container.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains(NODE_NAME.LABEL)) {
        this.onEditMode(target);
      }
    });

    // 투두 수정 완료
    this.container.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape' || key === 'Enter') {
        const $editList = this.container.querySelectorAll(SELECTOR.EDIT_INPUT);
        const $activeInput = Array.from($editList).find(
          (element) => element === document.activeElement,
        );
        $activeInput && this.offEditMode($activeInput, key); // 현재 focused 상태의 input이 있을 경우
      }
    });
  }

  /**
   * Edit mode 로 변경해주는 메서드
   * @param {EventTarget} target
   */
  onEditMode(target) {
    const $li = target.closest(NODE_NAME.LIST);
    // 이미 complete 된 투두는 변경 불가
    if ($li.classList.contains(CLASS_NAME.COMPLETED)) return;
    const value = target.closest(NODE_NAME.LABEL).innerText;
    const $input = $li.querySelector(SELECTOR.EDIT_INPUT);
    $li.classList.add(CLASS_NAME.EDITING);
    $input.value = value;
  }

  /**
   * Edit Mode 끝내주는 메서드
   * @param {EventTarget} target
   * @param {'Enter' | 'Escape'} key
   */
  offEditMode(target, key) {
    const $li = target.closest(NODE_NAME.LIST);
    const $label = $li.querySelector(NODE_NAME.LABEL);
    const value = target.value;

    // 내용이 변경 되었을 경우
    if (key === 'Enter' && value !== $label.innerText && value.length > 0) {
      $label.innerText = value;
      this.onUpdateTodo(+$li.dataset.id, value);
    }
    $li.classList.remove(CLASS_NAME.EDITING);
  }

  /**
   * 내용이 바뀐 투두를 데이터베이스에 전달해주는 메서드
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
   * 투두 Complete 토글 메서드
   * @param {number} id
   * @param {Element} $li
   * @param {EventTarget} target
   */
  onToggleComplete(id, $li, target) {
    target.toggleAttribute('checked');
    $li.classList.toggle(CLASS_NAME.COMPLETED);

    const updatedData = this.store.originData.map((data) => {
      if (data.id === id) {
        return { ...data, complete: !data.complete };
      }
      return data;
    });
    this.store.setOriginData(updatedData);
  }

  /**
   * 투두 삭제 메서드
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
