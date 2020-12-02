const filtersData = [
  { className: 'all', innerText: '전체보기', href: '/#' },
  { className: 'active', innerText: '해야할 일', href: '#active' },
  { className: 'completed', innerText: '완료한 일', href: '#completed' },
];

export const TodoFilters = ({ handleClickFilter, selectedFilter }) => {
  const filters = filtersData.map(filter => {
    if (selectedFilter === filter.className) {
      return TodoFilter({ ...filter, handleClickFilter, isSelected: true });
    }

    return TodoFilter({ ...filter, handleClickFilter, isSelected: false });
  });

  return filters;
};

const TodoFilter = ({
  className,
  innerText,
  href,
  handleClickFilter,
  isSelected,
}) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.classList.add(className);
  if (isSelected) {
    a.classList.add('selected');
  }
  a.setAttribute('href', href);
  a.innerText = innerText;
  li.addEventListener('click', handleClickFilter);
  li.append(a);

  return li;
};
