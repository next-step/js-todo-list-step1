
const filter = {
  active: () => filteredList = todoList.filter(item => !item.completed),
  completed: () => filteredList = todoList.filter(item => item.completed),
  all: () => filteredList = [],
}

const filterBy = ({ newURL }) => {
  const type = newURL.split('#')[1];
  const filterType = filter[type];
  if (!filterType) return;

  filterType();
  renderView();
}

export const setRouter = () => window.addEventListener('hashchange', filterBy);

export const removeRouter = () =>   window.removeEventListener('hashchange', filterBy);