class TodoFilter {
  filters;

  constructor($target, { setWhatToShow }) {
    this.$filterContainer = $target;
    this.filters = $target.querySelectorAll('li>*');

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
