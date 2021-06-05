import { SELECTED } from '../constants.js';

export default function TodoCount({ onFilter }) {
  const $todoCountContainer = document.querySelector('.count-container');

  const $filterButtons = {
    all: $todoCountContainer.querySelector('.all'),
    active: $todoCountContainer.querySelector('.active'),
    completed: $todoCountContainer.querySelector('.completed'),
  };

  $todoCountContainer.addEventListener('click', (event) => this.changeFilterButtonStatus(event));

  this.render = (count) => {
    const todoCount = $todoCountContainer.querySelector('strong');
    todoCount.innerText = count;
  };

  this.changeSelection = (filterName) => {
    Object.keys($filterButtons).map((key) => $filterButtons[key].classList.remove(SELECTED));
    $filterButtons[filterName].classList.add(SELECTED);
  };

  this.initFilterButtonStatus = () => {
    const filterStatus = window.location.hash.replace(/#/, '');
    if (filterStatus === '') return;
    this.changeSelection(filterStatus);
  };

  this.changeFilterButtonStatus = (event) => {
    const filterButtonTarget = event.target;
    if (filterButtonTarget.tagName !== 'A') return;

    const [filterName] = filterButtonTarget.classList;
    this.changeSelection(filterName);
    onFilter(filterName);
  };
}
