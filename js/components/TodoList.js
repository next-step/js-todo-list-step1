const Item = ({ id, content, isCompleted }) => {
  return `<li ${isCompleted ? 'class=completed' : ''}>
  <input class="toggle" type="checkbox" value="${id}" ${isCompleted ? 'checked' : ''}>
  <label>${content}</label>
  </li>`;
};

export default class TodoList {
  constructor(props) {
    const { $element, items, onClickCheck } = props;
    this.$element = $element;
    this.items = items;

    this.render();
    this.$element.addEventListener('click', e => {
      if (e.target.nodeName == 'INPUT') {
        onClickCheck(e.target.value);
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
