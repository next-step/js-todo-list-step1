`use strict`;

class TodoFilters {
  constructor() {
    this.$filters = document.querySelector('.filters');

    this.$filters.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    if (event.target && event.target.nodeName === 'A') {
      this.$filters.querySelector('.selected').classList.remove('selected');
      event.target.classList.add('selected');
    }
  }
}

export default TodoFilters;
