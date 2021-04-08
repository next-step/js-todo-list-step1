import App from './components/App.js';
import { SELECTOR } from './utils/constant.js';

window.addEventListener('load', () => {
  App(document.getElementsByClassName(SELECTOR.TODO_APP));
});
