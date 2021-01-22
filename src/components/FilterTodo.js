export default class FilterTodo {
  constructor($filters, loadTodo) {
    $filters.addEventListener('click', ({ target }) => {
      this.filterTodo({ target }, loadTodo);
    });
  }

  filterTodo = ({ target }, loadTodo) => {
    if (target.nodeName === 'A') {
      target
        .closest('ul')
        .querySelectorAll('a')
        .forEach((target) => target.classList.remove('selected'));
      target.classList.add('selected');
      loadTodo(target.id);
    }
  };
}
