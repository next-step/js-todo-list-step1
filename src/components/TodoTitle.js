export default class Title {
  constructor({ $app }) {
    const $target = document.createElement('h1');
    $target.innerText = 'TODOS';

    $app.appendChild($target);
  }
}
