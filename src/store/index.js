export default function Store() {
  //State
  this.state = {
    todos: [],
    status: "all",
  };
  //Observer
  this.observers = [];
  this.addObserver = (observer) => this.observers.push(observer);
  this.observing = () =>
    this.observers.forEach((observer) => observer.render());

  //GET
  this.getState = () => {
    return this.state;
  };
  //SET
  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.observing();
  };
}
