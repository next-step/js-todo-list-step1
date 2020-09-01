export const CountContainer = class {

  #target;
  #props;
  #state;

  constructor (target, props) {
    this.#target = {
      wrapper: target,
      countText: target.querySelector('.todo-count strong'),
      buttons: target.querySelectorAll('.filters a'),
      allButton: target.querySelector('.all'),
      activeButton: target.querySelector('.active'),
      completedButton: target.querySelector('.completed'),
    };
    this.#props = props;
    this.#setState({
      selected: this.#target.allButton
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
    const { allButton, activeButton, completedButton } = this.#target;
    allButton.addEventListener('click', e => {
      e.preventDefault();
      this.#setState({ selected: allButton });
      this.#props.selectToDoListType('all');
    })
    activeButton.addEventListener('click', e => {
      e.preventDefault();
      this.#setState({ selected: activeButton });
      this.#props.selectToDoListType('active');
    })
    completedButton.addEventListener('click', e => {
      e.preventDefault();
      this.#setState({ selected: completedButton });
      this.#props.selectToDoListType('completed');
    })
  }

  #setState (payload) {
    this.#state = { ...this.#state, ...payload }
    this.render();
  }
}