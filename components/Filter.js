import { ALL, ACTIVE, COMPLETED } from '../lib/constants';

class Filter {
  $filters = document.querySelector('.filters');
  $btnAll = document.querySelector('.filters .all');
  $btnActive = document.querySelector('.filters .active');
  $btnCompleted = document.querySelector('.filters .completed');

  constructor(setWhatToShow) {
    this.$filters.addEventListener('click', (e) =>
      this.handleClick(e, setWhatToShow)
    );
  }

  handleClick = (e, setWhatToShow) => {
    let selected;

    if (e.target === this.$btnAll) selected = ALL;
    else if (e.target === this.$btnActive) selected = ACTIVE;
    else if (e.target === this.$btnCompleted) selected = COMPLETED;
    setWhatToShow(selected);
    this.changeSelected(selected);
  };

  changeSelected = (selected) => {
    if (selected === ALL) {
      this.$btnAll.classList.add('selected');
      this.$btnActive.classList.remove('selected');
      this.$btnCompleted.classList.remove('selected');
    } else if (selected === ACTIVE) {
      this.$btnActive.classList.add('selected');
      this.$btnCompleted.classList.remove('selected');
      this.$btnAll.classList.remove('selected');
    } else if (selected === COMPLETED) {
      this.$btnCompleted.classList.add('selected');
      this.$btnAll.classList.remove('selected');
      this.$btnActive.classList.remove('selected');
    }
  };
}

export default Filter;
