import App from './Components/App.js';

import { SELECTOR } from './utils/constant.js';

try {
  document.addEventListener('DOMContentLoaded', () => {
    new App(document.querySelector(SELECTOR.TODO_APP));
  });
} catch (err) {
  console.error(err);
}
