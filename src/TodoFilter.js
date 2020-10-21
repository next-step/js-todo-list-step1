import {FilterDetails} from './constants.js';

export default function TodoFilter($todoFilter, {data, activeFilterType}, filterItems) {
  this.$todoFilter = $todoFilter;
  this.data = data;
  this.activeFilterType = activeFilterType;

  this.init = () => {
    this.render();
    this.bind();
  };

  this.bind = () => {
    this.$todoFilter.addEventListener('click', ({target}) => {
      FilterDetails.filter(({type}) => {
        if (target.classList.contains(type)) {
          this.activeFilterType = type;
          filterItems(this.activeFilterType);
        }
      });
      this.render();
    });
  };

  this.render = () => {
    this.$todoFilter.innerHTML = FilterDetails.map(({type, text}) => `
      <li>
        <a class="${type} ${this.activeFilterType == type? 'selected': ''}" href="#${type}">${text}</a>
      </li>
    `).join('');
  };

  this.init();
}
