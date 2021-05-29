// components
import TodoApp from './components/TodoApp.js';

function handleLoadAfter() {
  new TodoApp();
}

window.addEventListener('load', handleLoadAfter);
