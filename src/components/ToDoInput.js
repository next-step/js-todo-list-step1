import {Component} from "../_core";

export const ToDoInput = class extends Component{

  constructor (target, props) {
    super(target, props);
  }

  _initEventListener () {
    const { $target } = this;
    $target.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') {
        this.$props.addToDoItem($target.value);
        $target.value = '';
      }
    })
  }



}