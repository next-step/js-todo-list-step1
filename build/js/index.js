/* @jsx createElement */
import { createElement } from './lib/React.js';
import { render } from './lib/ReactDOM.js';
import App from './App.js';
import { createStore } from './lib/Redux.js';
import { todoReducer } from './modules/todos/index.js'; // 스토어 생성

export const store = createStore(todoReducer); // 리스너

const listener = () => {
  const $root = document.querySelector('#root');

  if ($root.firstElementChild) {
    document.querySelector('#root').removeChild($root.firstElementChild);
  }

  render(createElement(App, null), $root);
}; // 리스너 등록


store.subscribe(listener);
render(createElement(App, null), document.querySelector('#root'));