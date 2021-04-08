import { SELECTOR, STATUS } from '../utils/constant.js';
import { todoListTemplates } from '../utils/templates.js';
import Observer from '../libs/Observer.js';

class TodoList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = document.getElementById(SELECTOR.TODO_LIST);
    this.bindEvent();
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
      // 로컬 스토리지에 업데이트 하는 함수 실행 -> value와 key 넣어서...
      // onTodoUpdate()
      $label.innerText = $value;
    }
    $li.className = '';
  }

  onTodoUpdate() {
    // 로컬 스토리지에 저장
    // 스토어에 저장
  }

  update() {
    this.render();
  }

  render() {
    let renderData = this.store.todoData;
    // 렌더링 될 데이터 Status 에 따라서 필터링
    switch (this.store.status) {
      case STATUS.NOT_COMPLETED:
        // renderedData = this.store.todoDatas.fillter(())
        break;
      case STATUS.COMPLETED:
        break;
      default:
    }
    this.container.innerHTML = todoListTemplates(renderData);
  }
}

export default TodoList;
