const Item = ({ id, content, isCompleted }) => {
  return `<li ${isCompleted ? 'class=completed' : ''}>
  <input class="toggle" type="checkbox" value="${id}" ${isCompleted ? 'checked' : ''}>
  <label>${content}</label>
  <button class="destroy" name="${id}"></button>
  </li>`;
};

export default class TodoList {
  constructor(props) {
    const { $element, items, onClickToggle, onClickDestroy } = props;
    this.$element = $element;
    this.items = items;

    this.render();
    this.$element.addEventListener('click', e => {
      if (e.target.nodeName == 'INPUT') {
        onClickToggle(e.target.value);
      }

      if (e.target.nodeName == 'BUTTON') {
        console.log(e.target.name);
        onClickDestroy(e.target.name);
      }
    });
  }

  render() {
    this.$element.innerHTML = `${this.items
      .map((item, id) => Item({ id: id, content: item.content, isCompleted: item.isCompleted }))
      .join('')}`;
  }

  setState(newItems) {
    this.items = newItems;
    this.render();
  }
}
