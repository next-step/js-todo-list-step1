import { createElement as e } from '../utils/createElement.js';

export default function TodoItem({ id, title, isDone }) {
  return e(
    'li',
    { class: isDone && 'completed', dataId: id },
    e(
      'div',
      { class: 'view' },
      e('input', {
        class: 'toggle',
        type: 'checkbox',
        checked: isDone,
      }),
      e('label', { class: 'label' }, title),
      e('button', { class: 'destroy' })
    ),
    e('input', { class: 'edit', value: title })
  );
}
