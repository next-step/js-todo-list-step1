import { TAB, MESSAGE } from '../utils/constant.js';

function TodoCount({ $target, todoCountState }) {
  this.init = () => {
    this.$target = $target;
    this.state = todoCountState;

    this.render();
  };

  this.getSelectedTabCount = (selectedTab) => {
    const { todos } = this.state;
    let renderCount = 0;

    switch (selectedTab) {
      case TAB.ALL:
        renderCount = todos.length;
        break;

      case TAB.ACTIVE:
        renderCount = todos.filter(({ isCompleted }) => !isCompleted).length;
        break;

      case TAB.COMPLETED:
        renderCount = todos.filter(({ isCompleted }) => isCompleted).length;
        break;

      default:
        console.error(`TodoCount Render Error : ${MESSAGE.UNDEFINED_TAB}`);
        break;
    }

    return renderCount;
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
