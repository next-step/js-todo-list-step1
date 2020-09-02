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

  commit (mutationKey, payload) {
    const newState = { ...this.$state };
    this.$mutations[mutationKey](newState, payload);
    this.setState(newState);
  }

  setState (newState) {
    this.$state = { ...this.$state };
    this.$observing.forEach(component => component.render());
  }

}