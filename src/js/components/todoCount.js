import { ALL, VIEW, COMPLETE, selectedToClass } from "../constant/constant.js";

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
    this.$target.querySelector(`.${selectedToClass[this.state.selected]}`).classList.add('selected');
    const numberElement = this.$target.querySelector('strong');
    const { selected } = this.state;
    const totalLength = this.state.todos.length;

    if (selected === ALL) {
      numberElement.textContent = totalLength
      return;
    } 
    const completedItems = this.state.todos.filter((item) => item.state === COMPLETE);

    numberElement.textContent = selected === COMPLETE ?
    completedItems.length : totalLength - completedItems.length
  }
}