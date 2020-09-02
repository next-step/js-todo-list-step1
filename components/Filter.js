class Filter {
  $btnAll = document.querySelector('.filters .all');
  $btnActive = document.querySelector('.filters .active');
  $btnCompleted = document.querySelector('.filters .completed');

  constructor(filterAllTodo, filterActiveTodo, filterCompletedTodo) {
    this.$btnAll.addEventListener('click', () =>
      this.onClickAll(filterAllTodo)
    );
    this.$btnActive.addEventListener('click', () =>
      this.onClickActive(filterActiveTodo)
    );
    this.$btnCompleted.addEventListener('click', () =>
      this.onClickCompleted(filterCompletedTodo)
    );
  }

  onClickAll = (filterAllTodo) => {
    filterAllTodo();
    this.$btnAll.classList.add('selected');
    this.$btnActive.classList.remove('selected');
    this.$btnCompleted.classList.remove('selected');
  };

  onClickActive = (filterActiveTodo) => {
    filterActiveTodo();
    this.$btnActive.classList.add('selected');
    this.$btnCompleted.classList.remove('selected');
    this.$btnAll.classList.remove('selected');
  };

  onClickCompleted = (filterCompletedTodo) => {
    filterCompletedTodo();
    this.$btnCompleted.classList.add('selected');
    this.$btnAll.classList.remove('selected');
    this.$btnActive.classList.remove('selected');
  };
}

export default Filter;
