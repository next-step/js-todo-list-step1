import { debounceOneFrame } from "../utils/index.js";

export const Component = class {
  $state = {}; $target; $props; $render;

  constructor(target, state = {}, props = {}) {
    this.$target = target;
    this.$props = props;
    this.$render = debounceOneFrame(() => {
      target.innerHTML = this.render();
    });
    this.setEvent(target);
    this.setState(state);
  }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }
  render () { return '' }
  setEvent (componentTarget) {  }
}