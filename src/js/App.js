import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCounter from './components/TodoCounter.js';
import TodoFilters from './components/TodoFilters.js';
import TodoStore from './libs/TodoStore.js';
import localStorage from './utils/localStorage.js';

const App = () => {
  const initialData = localStorage.getItem(); // 데이터 가져오기
  const store = new TodoStore(initialData); // DB 에서 받아온 데이터로 store 초기화
  const todoInput = new TodoInput(store);
  const todoList = new TodoList(store);
  const todoFilters = new TodoFilters(store);
  const todoCounter = new TodoCounter(store);

  store.addObserver(todoList); // ToDoStore의 관찰자로 등록
  store.addObserver(todoCounter);
};

export default App;
