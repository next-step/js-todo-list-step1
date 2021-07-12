function TodoFilter({ onSelectedAll, onSelectedActive, onSelectedCompleted }) {
  const $filters = document.querySelector('.filters');

  $filters.addEventListener('click', (event) => this.filter(event));

  this.filter = (event) => {
    if (event.target.classList.contains('all')) {
      onSelectedAll();
    } else if (event.target.classList.contains('active')) {
      onSelectedActive();
    } else if (event.target.classList.contains('completed')) {
      onSelectedCompleted();
    }
  };
}

export default TodoFilter;
