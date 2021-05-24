import { $ } from '../utils/common.js';
import { todoItemTemplate } from './Template.js';
import { handleClickEvent, handleSelectedState } from '../utils/events.js';
import TodoCount from './TodoCount.js';

export default function TodoList() {
  const selectedFilter = $('.filters ').querySelector('.selected');
  const state = selectedFilter.classList[0] || 'all';
  const  { stateList } = handleSelectedState(state);

  this.$todoList = $('.todo-list');
  this.$todoList.addEventListener('click', handleClickEvent);
  this.$todoList.addEventListener('dblclick', handleClickEvent);

  this.setState = (stateList) => {
    this.todoItems = stateList;
    this.todoscount = stateList.length;
    this.render();
  };

  this.render = () => {
    const template = stateList.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
    new TodoCount(stateList.length);
  };
}

