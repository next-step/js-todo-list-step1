import { $ } from '../utils/common.js';
import { todoItemTemplate } from './Template.js';
import { handleClickEvent, handleSelectedState } from '../utils/events.js';
import TodoCount from './TodoCount.js';

function TodoList() {
  this.$todoList = $('.todo-list');
  this.$todoList.addEventListener('click', handleClickEvent);
  this.$todoList.addEventListener('dblclick', handleClickEvent);
  const selectedFilter = $('.filters ').querySelector('.selected');
  const state = selectedFilter.classList[0] || 'all';
  const  { stateList } = handleSelectedState(state);

  this.setState = () => {
    this.todoItems = stateList;
    this.todoscount = stateList.length;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
    new TodoCount(items.length);
  };
}

export default TodoList;
