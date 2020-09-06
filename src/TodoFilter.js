import {FilterDetails} from './constants.js';

export default function TodoFilter($todoFilter, data, selected, filterItems) {
  this.$todoFilter = $todoFilter;
  this.data = data;
  this.selected = selected;

  this.init = () => {
    this.render();
    this.bind();
  };

  this.bind = () => {
    this.$todoFilter.addEventListener('click', ({target}) => {
      FilterDetails.filter(({type}) => {
        if (target.classList.contains(type)) {
          this.selected = type;
          filterItems(this.selected);
        }
      });
      this.render();
    });
  };

  this.render = () => {
    let result = '';
    FilterDetails.map(({type, text}) => {
      result += `
        <li>
          <a class="${type} ${this.selected == type? 'selected': ''}" href="#${type}">${text}</a>
        </li>
        `;
    });

    this.$todoFilter.innerHTML = result;
  };

  this.init();
}
