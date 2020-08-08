export default class TodoInfo {
  constructor(filterList, todoCount, selectFilter) {
    this.filterList = filterList;
    this.todoCount = todoCount || 0;
    this.selectFilter = selectFilter;

    this.todoInfoElement = document.querySelector('#count-container');
    this.render();
    this.selectFilterEvent();
  }

  setState(filterList, count) {
    this.filterList = filterList;
    this.todoCount = count;
    this.render();
  }

  selectFilter(clickedFilter) {
    this.filterList = this.filterList.map((filter) => {
      if (clickedFilter.includes(filter.state)) {
        filter.selected = true;
        location.hash = `#${filter.state}`;
      } else {
        filter.selected = false;
      }
      return filter;
    });
  }

  selectFilterEvent() {
    this.todoInfoElement.addEventListener('click', ($event) => {
      const target = $event.target;
      if (target.tagName === 'A') {
        this.selectFilter(target.className);
        this.render();
      }
      $event.preventDefault();
    });
  }

  createFilters() {
    return this.filterList
      .map((filter) => {
        const liElement = document.createElement('li');
        const anchorElement = document.createElement('a');
        anchorElement.className = `${filter.state}${
          filter.selected ? ' selected' : ''
        }`;
        anchorElement.href = `#${filter.state}`;
        anchorElement.textContent = filter.title;
        liElement.appendChild(anchorElement);
        return liElement.outerHTML;
      })
      .join('');
  }

  render() {
    this.todoInfoElement.innerHTML = `
      <span class="todo-count">총 <strong>${this.todoCount}</strong> 개</span>
      <ul id="filters">
        ${this.createFilters()}
      </ul>
    `;
  }
}
