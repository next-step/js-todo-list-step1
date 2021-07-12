import { Store } from '../core/redux';

export default class AppStore extends Store {
  initState() {
    this.state = {
      todos: [],
    };
  }
}
