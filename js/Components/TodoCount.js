import { MESSAGE, CLASS_NAME } from '../utils/constant.js';
import { checkTarget } from '../utils/validator.js';

function TodoCount({ $target, todoCountState }) {
  this.init = () => {
    checkTarget($target);

    this.$target = $target;
    this.state = todoCountState;

    this.render();
  };

  this.getSelectedTabCount = (selectedTab) => {
    const { todos } = this.state;

    switch (selectedTab) {
      case CLASS_NAME.ALL:
        return todos.length;

      case CLASS_NAME.ACTIVE:
        return todos.filter(({ isCompleted }) => !isCompleted).length;

      case CLASS_NAME.COMPLETED:
        return todos.filter(({ isCompleted }) => isCompleted).length;

      default:
        console.error(`TodoCount Render Error : ${MESSAGE.UNDEFINED_TAB}`);
        return;
    }
  };

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const renderCount = this.getSelectedTabCount(this.state.selectedTab);

    this.$target.innerHTML = `총 <strong>${renderCount}</strong> 개`;
  };

  this.init();
}

export default TodoCount;
