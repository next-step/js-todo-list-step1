import newTodoInput from '../components/NewTodoInput.js';
import todoList from '../components/TodoList.js';
import todosSubject from '../subjects/TodosSubject.js';
import todoCount from '../components/TodoCount.js';
import filters from '../components/Filters.js';

// 컴포넌트 생성 및 초기화
newTodoInput.init();
filters.init();
todoList.init();
todoCount.init();

// 할일 목록을 관리하는 todosSubject에 옵저버 등록
todosSubject.registerObserver(todoList);
todosSubject.registerObserver(todoCount);

// url 해시코드에 따른 필터 적용
if (window.location.hash === '#active') {
  filters.showActive();
} else if (window.location.hash === '#completed') {
  filters.showCompleted();
}
