export default class FilterTodo {
  constructor($filters, loadTodo) {
    this.loadTodo = loadTodo;
    $filters.addEventListener('click', this.filterTodo);
  }

  filterTodo = ({ target }) => {
    if (target.nodeName === 'A') {
      target
        .closest('ul')
        .querySelectorAll('a')
        .forEach((target) => target.classList.remove('selected'));
      target.classList.add('selected');
      this.loadTodo(target.id);
    }
  };
}
