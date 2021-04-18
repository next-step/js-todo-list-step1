import { $ } from '../utils/common.js';
import { handleSelectedState } from '../utils/events.js';
import TodoList from './TodoList.js';

export default function TodoCount(todosCount) {
  this.$todoFilterStates = $('.filters');
  this.$todoCount = $('.todo-count strong');
  const stateFilters = this.$todoFilterStates.querySelectorAll('a');
  this.$todoCount.innerText = todosCount;

  Array.from(stateFilters).map(filter => filter.addEventListener('click', (event) => this.selectedState(event)))

  this.selectedState = (event) => {
    const state = event.target.classList[0] || 'all';
    const  { stateList, count } = handleSelectedState(state);

    stateFilters.forEach(state => state.classList.remove('selected'));
    event.target.classList.add('selected');

    const updatedItems = new TodoList();
    updatedItems.setState(stateList);
    this.$todoCount.innerText = count;
  }
}
