import Component from '../core/component.js';
import { FILTER_TYPES, TODO_BUTTONS } from '../utils/constants.js';
import { $, $$ } from '../utils/utils.js';

export default class TodoCount extends Component {
  setState(newState) {
    this.todoList = newState || this.props.todoList;
  }

  render() {
    $('.todo-count').innerHTML = `총 <strong>${this.todoList.length}</strong> 개`;
  }

  bindEvents() {
    $('.filters').addEventListener('click', ({ target }) => {
      if (target.classList.contains(FILTER_TYPES.ALL)) {
        this.props.filterState.set(FILTER_TYPES.ALL);
        this.selectFilterTypeBtn(FILTER_TYPES.ALL);
      }
      if (target.classList.contains(FILTER_TYPES.ACTIVE)) {
        this.props.filterState.set(FILTER_TYPES.ACTIVE);
        this.selectFilterTypeBtn(FILTER_TYPES.ACTIVE);
      }
      if (target.classList.contains(FILTER_TYPES.COMPLETED)) {
        this.props.filterState.set(FILTER_TYPES.COMPLETED);
        this.selectFilterTypeBtn(FILTER_TYPES.COMPLETED);
      }
      this.props.onClickTodoRender();
    });
  }

  selectFilterTypeBtn(type) {
    $$('a', $('.filters')).forEach((tag) => {
      tag.classList.remove(TODO_BUTTONS.SELECTED);
    });

    $(`.${type}`, $('.filters')).classList.add(TODO_BUTTONS.SELECTED);
  }
}
