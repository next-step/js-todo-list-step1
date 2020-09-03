export const TodoInput = class {

  target; props;

  constructor(target, props) {
    this.target = target;
    this.props = props;

    target.addEventListener('keydown', ({ key, target }) => {
      if (key === 'Enter') {
        this.props.onAdd(target.value);
      }
    })
  }
}