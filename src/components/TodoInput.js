import {Component} from "../core/Component/index.js";
import {store} from "../modules/index.js";
import {addTodo} from "../modules/todo/reducer.js";

export default class TodoInput extends Component {
    fetchAddTodo = (content) => {
      store.dispatch(addTodo(content));
    };

    setEvent(target) {
        target.addEventListener('keypress', ({key}) => {
          if (key === 'Enter') {
              this.fetchAddTodo(target.value);
              target.value = '';
          }
        })
    }
}