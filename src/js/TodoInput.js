export default function TodoInput() {
  this.state = initialState;

  this.setState = (nextState) => {
    this.setState = nextState;
    this.render();
  };
}
