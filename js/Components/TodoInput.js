import { MESSAGE } from '../utils/constant.js';

function TodoInput({ $target, onAddTodo }) {
  this.init = () => {
    this.$target = $target;

    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('keydown', this.onKeydown);
  };

  this.onKeydown = (e) => {
    if (e.key !== 'Enter') return;

    const keyword = e.target.value.trim();

    if (keyword.length === 0) {
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
