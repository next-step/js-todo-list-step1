export default class TodoFilter {
  constructor(todoCount, setFilterState) {
    this.todoCount = todoCount || 0;
    this.setFilterState = setFilterState;
    this.todoFilterContainerElement = document.querySelector(
      '#count-container'
    );
    this.todoFilterElement = document.querySelector('#filters');

    this.render();
    this.selectFilterEvent();
  }

  setState(count) {
    this.todoCount = count;
    this.render();
  }

  selectFilter(element, locationHash) {
    const state = locationHash.replace('#', '');
    if (element.classList.contains(state)) {
      element.classList.add('selected');
    } else if (element.classList.contains('selected')) {
      element.classList.remove('selected');
    }
  }

  changeFilter() {
    Array.from(this.todoFilterElement.children).forEach((liEl) => {
      const anchorElement = liEl.children[0];
      this.selectFilter(anchorElement, location.hash);
    });
  }

  selectFilterEvent() {
    this.todoFilterElement.addEventListener('click', ($event) => {
      const target = $event.target;
      if (!target.classList.contains('selected')) {
        this.setFilterState(target.className.replace('selected', '').trim());
      }
      $event.preventDefault();
    });
  }

  render() {
    this.changeFilter();
    this.todoFilterContainerElement.firstElementChild.children[0].textContent = this.todoCount;
  }
}
