import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoStore from './libs/TodoStore.js';

const App = () => {
  // 로컬 스토리지에서 데이터 가져와서 넣어주기
  const store = new TodoStore([]);
  const todoInput = new TodoInput(store);
  const todoList = new TodoList(store);
  store.addObserver(todoList);
};

export default App;
