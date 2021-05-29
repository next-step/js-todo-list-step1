import { ALL, VIEW, COMPLETE, converter } from "../constant/constant.js";

export class TodoCount {
  constructor($target, props) {
    this.$target = $target;
    this.state = props.state;
    this.changeSelected = props.changeSelected;
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
    const numElement = this.$target.querySelector('.todo-count').children[0];
    numElement.innerHTML = this.state.todos.length;
    this.$target.querySelector('.selected').classList.remove('selected');
    this.$target.querySelector(`.${converter[this.state.selected]}`).classList.add('selected');
  }
}