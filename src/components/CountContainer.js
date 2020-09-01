export const CountContainer = class {

  #target;
  #props;
  #state;

  constructor (target, props) {
    this.#target = {
      wrapper: target,
      countText: target.querySelector('.todo-count strong'),
      buttons: target.querySelector('.filters a'),
      allButton: target.querySelector('.all'),
      activeButton: target.querySelector('.active'),
      completedButton: target.querySelector('.completed'),
    };
    this.#props = props;
    this.render();
    this.#initEventListener();
  }

  render () {
    this.#target.countText.innerHTML = this.#props.getItemCount();
  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload }
    this.render();
  }

  #initEventListener () {

  }
}