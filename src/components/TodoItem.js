import { createElement as e } from '../utils.js';

export default class TodoItem {
  constructor(title) {
    this._$el = document.createElement('li');
    this.title = title;
    this.render(this.title);
    this._$el.addEventListener('click', (e) => this.onClickHandler(e));
  }

  get element() {
    return this._$el;
  }

  onClickHandler({ target }) {
    const { className } = target;

    if (className === 'toggle') {
      this._$el.classList.toggle('completed');
      target.classList.toggle('checked');
    }
    if (className === 'destroy') {
      this._$el.remove();
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
      ),
      e('input', { class: 'edit', value: title })
    );
  }
}
