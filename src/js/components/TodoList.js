import { SELECTOR } from '../utils/constant.js';
import TodoInput from './TodoInput.js';

// TODO: li 태그에 id 값을 넣기
const TodoList = () => {
  const container = document.getElementById(SELECTOR.TODO_LIST);
  render();

  function render() {
    TodoInput(onSubmit);
    container.addEventListener('dblclick', (e) => {
      const target = e.target;
      if (target.className === SELECTOR.LABEL) {
        onEditMode(e.target);
      }
    }); // editMode on

    container.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        const $editList = container.querySelectorAll(SELECTOR.EDIT_INPUT);
        const $activeInput = Array.from($editList).find(
          (element) => element === document.activeElement,
        );
        $activeInput && offEditMode($activeInput); // 현재 active 한 input이 있을 경우
      }
    }); // editMode off
  }

  function onEditMode(target) {
    const $li = target.closest(SELECTOR.LIST);
    const $value = target.closest(SELECTOR.LABEL).innerText;
    const $input = $li.querySelector(SELECTOR.EDIT_INPUT);
    $li.className += SELECTOR.EDITING_MODE;
    $input.value = $value;
  }

  function offEditMode(target) {
    const $li = target.closest(SELECTOR.LIST);
    const $label = $li.querySelector(SELECTOR.LABEL);
    const $value = target.value;
    if ($value !== $label.innerText) {
      // 로컬 스토리지에 업데이트 하는 함수 실행 -> value와 key 넣어서...
      $label.innerText = $value;
    }
    $li.className = '';
  }

  function onSubmit(e) {
    e.preventDefault();
    const Input = document.getElementById(SELECTOR.TODO_INPUT);
    const todo = Input.value;
    Input.value = '';
    container.innerHTML += `
        <li>
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${todo}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit"/>
        </li>`;
    // localStorage에 추가
  }
};

export default TodoList;
