export default class TodoInput {
  constructor({ $app, onKeypess }) {
    const $target = document.createElement('input');
    $target.id = 'new-todo-title';
    $target.className = 'new-todo';
    $target.placeholder = '할일을 추가해주세요';
    $target.autofocus = true;

    $target.addEventListener('keypress', event => {
      if (event.key === 'Enter' && event.target.value !== '') {
        onKeypess(event.target.value);
        event.target.value = '';
      }
    });

    $app.appendChild($target);
  }
}
