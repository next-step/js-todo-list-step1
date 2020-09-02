export const Component = class {
  $state; $target; $props;

  constructor(target, props, state) {
    this.$target = target;
    this.$props = props;
    if (state) this.setState(state);
    this.initEventListener();
  }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this._setState(payload);
    this.render();
  }
  _setState(payload) {}

  render () { this._render(); }
  _render () {}
  initEventListener () { this._initEventListener(); }
  _initEventListener () { }
}