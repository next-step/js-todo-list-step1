export const Store = class {

  $state; #mutations; #observing; #getters

  constructor({ state, mutations, getters }) {
    this.$state = state;
    this.#mutations = mutations;
    this.#getters = getters;
    this.#observing = new Set();
  }

  addObserver (...components) {
    components.forEach(component => this.#observing.add(component));
  }

  commit (mutationKey, payload) {
    const newState = { ...this.$state };
    this.#mutations[mutationKey](newState, payload);
    this.#setState(newState);
  }

  get $getters () {
    return Object.entries(this.#getters)
                 .reduce((getters, [key, getter]) => {
                   getters[key] = getter(this.$state);
                   return getters;
                 }, {});
  }

  #setState (newState) {
    this.$state = { ...newState };
    this.#observing.forEach(component => component.render());
  }

}