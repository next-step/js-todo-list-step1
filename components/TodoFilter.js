class TodoFilter {
  $filterContainer = document.querySelector('.filters');
  filters = document.querySelectorAll('.filters>li>*');

  constructor(setWhatToShow) {
    this.$filterContainer.addEventListener('click', (e) =>
      this.handleClick(e, setWhatToShow)
    );
  }

  handleClick = (e, setWhatToShow) => {
    let selected = e.target.className;
    setWhatToShow(selected);
    this.changeSelected(selected);
  };

  changeSelected = (selected) => {
    this.filters.forEach(($filter) => {
      $filter.classList.remove('selected');
      if ($filter.className === selected) $filter.classList.add('selected');
    });
  };
}

export default TodoFilter;
