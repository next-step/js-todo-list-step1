import {Component} from "../_core";
import {debounceOf} from "../utils";

export const ToDoInput = class extends Component{

  constructor (target, props) {
    super(target, props);
  }

  _initEventListener () {
    const { $target } = this;
    const callback = debounceOf(() => {
      this.$props.addToDoItem($target.value);
      $target.value = '';
    });
    $target.addEventListener('keydown', ({ key }) => {
      if (key === 'Enter') callback(1000 / 60);
    })
  }

}