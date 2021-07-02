export default class Component {
  constructor($target, $props, store) {
    this.$target = $target;
    this.$props = $props;
    this.store = store;

    this.initState();
    this.setEvent();
    this.render();
  }

  initState() {}
  setEvent() {}
  template() {
    return '';
  }
  mounted() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}
