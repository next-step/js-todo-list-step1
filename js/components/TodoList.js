const itemLabel = ({ content, isCompleted }) => {
  return `<li ${isCompleted ? 'class=completed' : ''}><label>${content}</label></li>`;
};

export default class TodoList {
  constructor({ $element, items }) {
    this.$element = $element;
    this.items = items;

    this.render();
  }

  render() {
    this.$element.innerHTML = `${this.items
      .map(item => itemLabel({ content: item.content, isCompleted: item.isCompleted }))
      .join('')}`;
  }

  setState(newItems) {
    this.items = newItems;
    this.render();
  }
}
