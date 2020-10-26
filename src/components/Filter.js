import { parseHash } from '../utils/utils.js';

export default function Filter(todos, href) {
  const $$Filters = document.querySelectorAll('.filters li a');
  const hash = parseHash(href);

  $$Filters.forEach((node) => {
    parseHash(node.href) === hash
      ? node.classList.add('selected')
      : node.classList.remove('selected');
  });

  if (hash === 'active') {
    todos = todos.filter(({ isDone }) => !isDone);
  } else if (hash === 'completed') {
    todos = todos.filter(({ isDone }) => isDone);
  } else {
  }

  return todos;
}
