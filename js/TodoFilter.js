function TodoFilter(element, { filterTodo }) {
  this.$filters = element;
  this.filterTodo = filterTodo;

  this.$filters.addEventListener('click', e => {
    Array.from(this.$filters.getElementsByTagName('a')).forEach(el => el.classList.remove('selected'));
    const mode = Array.from(e.target.classList)[0];
    this.filterTodo(mode);
    e.target.classList.add('selected');
  });
}

export default TodoFilter;
