const todoStatus = (setFilter) => {
  const ulist = document.getElementById('todo-list');
  const spanCount = document.querySelector('.todo-count > strong');
  const filter = document.querySelector('ul.filters');

  filter.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      //TODO vs onclick
      filter.querySelector('a.selected').classList.remove('selected'); //TODO 이전과 같은 필터인경우에도 .selected 삭제 추가 반복중
      const filterType = e.target.classList[0];

      e.target.classList.add('selected');
      setFilter(filterType);
      updateCount();
    }
  });

  const updateCount = () => {
    spanCount.textContent =
      ulist.querySelectorAll('li').length -
      ulist.querySelectorAll('li.hidden').length;
  };

  return {
    updateCount,
  };
};

export { todoStatus };
