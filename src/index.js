import App from './components/App.js';
import TodoStore from './store/todoStore.js';

new App();
new TodoStore([
  { id: 1, title: '밥 먹기', isDone: true },
  { id: 2, title: '아침 먹기', isDone: false },
  { id: 3, title: '점심 먹기', isDone: false },
  { id: 4, title: '저녁 먹기', isDone: false },
]);
