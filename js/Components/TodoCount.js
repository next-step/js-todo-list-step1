import { TAB, MESSAGE } from '../utils/constant.js';

function TodoCount({ $target, todoCountState }) {
  this.init = () => {
    this.$target = $target;
    this.state = todoCountState;

    this.render();
  };

  this.getSelectedTabCount = (selectedTab) => {
    const { todos } = this.state;

    switch (selectedTab) {
      case TAB.ALL:
        return todos.length;

      case TAB.ACTIVE:
        return todos.filter(({ isCompleted }) => !isCompleted).length;

      case TAB.COMPLETED:
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
