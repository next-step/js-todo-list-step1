export default class Component {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}
  setEvent() {}
  template() {
    return '';
  }
  mounted() {}
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}
