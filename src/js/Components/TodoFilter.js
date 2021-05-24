function TodoFilter({ onChangeFilter }) {
  const filterElement = document.getElementById('filters');

  this.render = (selectedFilter) => {
    [...filterElement.children].map((item) =>
      item.firstElementChild.classList.contains(selectedFilter)
        ? item.firstElementChild.classList.add('selected')
        : item.firstElementChild.classList.remove('selected')
    );
  };

  const handleFilter = () => {
    const hash = window.location.hash;
    if (!!hash) {
      return onChangeFilter(hash.slice(1));
    }
    return onChangeFilter('all');
  };

  window.addEventListener('hashchange', handleFilter);
}

export default TodoFilter;
