import Subject from './Subject.js';
// Todo 앱 전반 State 관리
class TodoStore extends Subject {
  constructor(initialData) {
    super();
    this.todoData = initialData;
    this.status = 'all';
  }

  // 외부에서 상태를 변경해주면, 모든 옵저버에게 notify
  setTodoData(todoData) {
    this.todoData = todoData;
    this.notifyAll();
  }

  setStatus(status) {
    this.status = status;
    this.notifyAll();
  }
}

export default TodoStore;
