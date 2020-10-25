import { createElement as e } from '../utils.js';

export default class TodoItem {
  constructor(title) {
    this._$el = document.createElement('li');
    this.title = title;
    this.render(this.title);
    this.attachEventListener();
  }

  get element() {
    return this._$el;
  }

  attachEventListener() {
    this._$el.addEventListener('click', (e) => this.onClickHandler(e));
    this._$el.addEventListener('dblclick', (e) => this.onDoubleClickHandler(e));
  }

  onClickHandler({ target }) {
    const { className } = target;

    if (className === 'toggle') {
      this._$el.classList.toggle('completed');
      target.classList.toggle('checked');
    } else if (className === 'destroy') {
      this._$el.remove();
    }
  }

  onDoubleClickHandler({ target }) {
    const { className } = target;

    if (className === 'label') {
      this._$el.classList.add('editing');
    }
  }

  render(title) {
    this._$el.appendChild(
      e(
        'div',
        { class: 'view' },
        e('input', { class: 'toggle', type: 'checkbox' }),
        e('label', { class: 'label' }, title),
        e('button', { class: 'destroy' })
      )
    );
    this._$el.appendChild(e('input', { class: 'edit', value: title }));
  }
}
