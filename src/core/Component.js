export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent();
  }
  setup() {}
  mounted() {}
  template() {}
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];

    const isTarget = (target) => {
      return children.includes(target) || target.closest(selector);
    };

    this.$target.addEventListener(eventType, (event) => {
      // event를 발생시킨 객체(event)가 children에 있는지 (ex deletedBtn 클래스인지)
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
