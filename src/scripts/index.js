import newTodoInput from '../components/NewTodoInput.js';
import todoCount from '../components/TodoCount.js';
import filters from '../components/Filters.js';

newTodoInput.init();

if (window.location.hash === '#active') {
  filters.showActive();
} else if (window.location.hash === '#completed') {
  filters.showCompleted();
}
