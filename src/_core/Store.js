export const Store = class {

  $state; $mutations; $observing;

  constructor({ state, mutations }) {
    this.$state = state;
    this.$mutations = mutations;
    this.$observing = new Set();
  }

  addObserver (component) {
    this.$observing.add(component);
  }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$observing.forEach(component => component.render());
  }

}