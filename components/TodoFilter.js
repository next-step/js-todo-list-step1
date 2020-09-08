class TodoFilter {
  constructor(setWhatToShow) {
    filters;
    this.$filterContainer = document.querySelector('.filters');
    this.filters = document.querySelectorAll('.filters>li>*');

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
      if ($filter.className === selected) $filter.classList.add('selected');
      else $filter.classList.remove('selected');
    });
  };
}

export default TodoFilter;
