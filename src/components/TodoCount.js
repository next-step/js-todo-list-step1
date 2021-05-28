export default function TodoCount({ onFilter }) {
  const $todoCountContainer = document.querySelector('.count-container');

  $todoCountContainer.addEventListener('click', (event) => this.filterTodoItems(event));

  this.render = (count) => {
    const todoCount = $todoCountContainer.querySelector('strong');
    todoCount.innerText = count;
  };

  this.filterTodoItems = (event) => {
    const { target } = event;

    if (target.tagName !== 'A') return;

    const filterList = target.closest('ul');

    const filterButtons = {
      all: filterList.querySelector('.all'),
      active: filterList.querySelector('.active'),
      completed: filterList.querySelector('.completed'),
    };

    Object.keys(filterButtons).map((key) => filterButtons[key].classList.remove('selected'));

    const filterName = target.classList[0];
    filterButtons[filterName].classList.add('selected');
    onFilter(filterName);
  };
}
