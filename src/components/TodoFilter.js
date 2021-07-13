export const FilterType = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});

export function TodoFilter() {
  this.filters = document.querySelector('.filters');
  this.filtersBtn = this.filters.querySelectorAll('a');

  this.filters.addEventListener('click', (event) => this.handleClick(event));

  this.setEventListener = (onFilter) => {
    this.onFilter = onFilter;
  };

  this.handleClick = (event) => {
    const type = event.target.className;

    this.removeSelectedClass();
    this.addSelectedClass(event.target);

    this.onFilter && this.onFilter(type);
  };

  this.removeSelectedClass = () => {
    this.filtersBtn.forEach((item) => {
      if (item.classList.contains('selected')) {
        item.classList.remove('selected');
      }
    });
  };

  this.addSelectedClass = (target) => {
    target.classList.add('selected');
  };
}
