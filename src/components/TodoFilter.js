export const FilterType = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});

export function TodoFilter({ filtering }) {
  this.filters = document.querySelector('.filters');
  this.filtersBtn = this.filters.querySelectorAll('a');

  this.filters.addEventListener('click', (event) => this.onClick(event));

  this.onClick = (event) => {
    const target = event.target;
    const filterType = target.className;

    // selected class 제거
    this.removeSelectedClass();
    // 선택한 filter에 selected class 추가
    this.addSelectedClass(target);

    filtering(filterType);
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
