export default class Component {
  $target;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setState();
    this.render();
    this.bindEvents();
  }

  setState() {}
  render() {}
  bindEvents() {}
}
