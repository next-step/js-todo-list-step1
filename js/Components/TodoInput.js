import { MESSAGE } from '../utils/constant.js';
import { checkTarget, checkTypeFunction } from '../utils/validator.js';

function TodoInput({ $target, onAddTodo }) {
  this.init = () => {
    checkTarget($target);
    checkTypeFunction(onAddTodo);

    this.$target = $target;

    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('keydown', this.onKeydown);
  };

  this.onKeydown = (e) => {
    if (e.key !== 'Enter') return;

    const keyword = e.target.value.trim();

    if (!keyword.length) {
      alert(MESSAGE.NO_INPUT_KEYWORD);
      e.target.value = '';
      return;
    }

    onAddTodo(keyword);
    e.target.value = '';
  };

  this.init();
}

export default TodoInput;
