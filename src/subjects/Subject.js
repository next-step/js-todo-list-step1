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

  notifyObservers(data) {
    this.observers.forEach((o) => o.update(data));
  }
}

export default Subject;
