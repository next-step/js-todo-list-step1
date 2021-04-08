import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCounter from './components/TodoCounter.js';
import TodoStore from './libs/TodoStore.js';
import localStorage from './utils/localStorage.js';

const App = () => {
  const initialData = localStorage.getItem();
  const store = new TodoStore(initialData);
  const todoInput = new TodoInput(store);
  const todoList = new TodoList(store);
  const todoCounter = new TodoCounter(store);
  store.addObserver(todoList);
  store.addObserver(todoCounter);
};

export default App;
