export const CountContainer = class {

  #target;
  #props;
  #state;

  constructor (target, props) {
    this.#target = {
      wrapper: target,
      countText: target.querySelector('.todo-count strong'),
      buttons: target.querySelectorAll('.filters a'),
    };
    this.#props = props;
    this.#setState({
      selected: target.querySelector('.filters a.all')
    })
    this.render();
    this.#initEventListener();
  }

  render () {
    const { countText, buttons } = this.#target;
    const { selected } = this.#state;
    countText.innerHTML = this.#props.getItemCount();
    buttons.forEach(button => {
      button.classList.remove('selected');
      if (button === selected) {
        button.classList.add('selected')
      }
    })
  }

  #initEventListener () {
    const { buttons, wrapper } = this.#target;
    const buttonList = [ ...buttons ];
    wrapper.addEventListener('click', e => {
      e.preventDefault();
      const { target } = e;
      if (!buttonList.includes(target)) return;
      this.#setState({ selected: target });
      this.#props.selectToDoListType(target.className.replace('selected', '').trim())
    })
  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload }
    this.render();
  }
}