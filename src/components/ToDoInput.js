import {Component} from "../_core";

export const ToDoInput = class extends Component{

  constructor (target, props) {
    super(target, props);
    super.setState({
      value: ''
    })
  }

  _initEventListener () {
    this.$target.addEventListener('input', ({ target }) => {
      super.setState({ value: target.value });
    })
    this.$target.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        this.$props.addToDoItem(this.$state.value);
        this.$target.value = '';
        super.setState({ value: '' });
      }
    })
  }

}