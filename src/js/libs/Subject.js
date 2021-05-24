class Subject {
  constructor() {
    this.observers = [];
  }
  // 옵저버 추가
  addObserver(observer) {
    this.observers = [...this.observers, observer];
  }

  // 옵저버 삭제
  removeObserver(observer) {
    const filteredList = this.observers.filter((v) => v !== observer);
    this.observers = filteredList;
  }

  // observers에 등록된 옵저버들의 update 함수 실행하여 상태 변경 notify
  notifyAll() {
    this.observers.forEach((observer) => observer.update());
  }
}

export default Subject;
