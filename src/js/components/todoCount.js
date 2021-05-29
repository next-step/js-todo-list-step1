import { ALL, VIEW, COMPLETE, converter } from "../constant/constant.js";

export class TodoCount {
  constructor($target, {state, changeSelected}) {
    this.$target = $target;
    this.state = state;
    this.changeSelected = changeSelected;
    this.render();
    this.addEvent();
  }
  setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  addEvent = () => {
    this.$target.addEventListener('click', (event) => {
      const { target } = event;
      if (target.classList.contains('selected')) return;
      if (target.classList.contains('all')) {
        this.changeSelected(ALL);
      } else if (target.classList.contains('active')) {
        this.changeSelected(VIEW);
      } else if (target.classList.contains('completed')) {
        this.changeSelected(COMPLETE);
      }
    })
  }

  render() {
    this.$target.querySelector('.selected').classList.remove('selected');
    this.$target.querySelector(`.${converter[this.state.selected]}`).classList.add('selected');
    const numElement = this.$target.querySelector('.todo-count').children[0];

    // TODO : 아래 부분 더 좋게 바꿔보기...

    if (this.state.selected === ALL) {
      numElement.textContent = this.state.todos.length;
    } else if (this.state.selected === VIEW) {
      const filteredItems = this.state.todos.filter((item) => item.state === VIEW);
      numElement.textContent = filteredItems.length;
    } else {
      const filteredItems = this.state.todos.filter((item) => item.state === COMPLETE);
      numElement.textContent = filteredItems.length;
    }
  }
}