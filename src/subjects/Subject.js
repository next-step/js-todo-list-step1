class Subject {
  constructor(data) {
    this.data = data;
    this.observers = [];
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  unregisterObserver(observer) {
    this.observers = this.observers.filter((registedObserver) => registedObserver !== observer);
  }

  notifyObservers() {
    this.observers.forEach((o) => o.update());
  }
}

export default Subject;
