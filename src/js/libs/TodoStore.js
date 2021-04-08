import Subject from './Subject.js';
import localStorage from '../utils/localStorage.js';
import { STATUS } from '../utils/constant.js';

// Todo 앱 전반 State 관리
class TodoStore extends Subject {
  constructor(initialData) {
    super();
    this.originData = initialData; // 데이터베이스로부터 가져온 전체 데이터
    this.renderData = initialData; // 보여줄 데이터
    this.status = STATUS.ALL; // 투두 필터링 status
  }

  updateData(newData) {
    this.setOriginData(newData);
    this.setRenderData(newData);
  }

  setOriginData(todoData) {
    // 로컬 스토리지에 저장
    localStorage.setItem(todoData);
    this.originData = todoData;
  }

  setRenderData(renderData) {
    this.renderData = renderData;
    this.notifyAll();
  }

  setStatus(status) {
    this.status = status;
    this.notifyAll();
  }
}

export default TodoStore;
