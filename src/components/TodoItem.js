import { createElement as e } from '../utils.js';

export default class TodoItem {
  constructor(title) {
    this._$el = document.createElement('li');
    this.title = title;
    this.render(this.title);
    this.attachEventHandler();
  }

  get element() {
    return this._$el;
  }

  onToggleHandler({ target }) {
    this._$el.classList.toggle('completed');
    target.classList.toggle('checked');
  }

  onDeleteHandler() {
    this._$el.remove();
  }

  render(title) {
    this._$el.appendChild(
      e(
        'div',
        { class: 'view' },
        e('input', { class: 'toggle', type: 'checkbox' }),
        e('label', { class: 'label' }, title),
        e('button', { class: 'destroy' })
      ),
      e('input', { class: 'edit', value: title })
    );
  }

  attachEventHandler() {
    const $checkbox = this._$el.querySelector('.toggle');
    $checkbox.addEventListener('click', (e) => this.onToggleHandler(e));

    const $destroy = this._$el.querySelector('.destroy');
    $destroy.addEventListener('click', () => this.onDeleteHandler());
  }
}
