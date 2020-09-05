import Storage from '../storage/index.js';

export const Store = class {

  $state;
  $getters;
  #mutations;
  #observing;
  #persistentKey;

  constructor({ state, mutations, getters, persistentKey = null }) {
    this.$state = Storage.get(persistentKey, state);
    this.#persistentKey = persistentKey;
    this.#mutations = mutations;
    this.$getters = Object.entries(getters)
                          .reduce((getters, [key, getter]) => {
                            Object.defineProperty(getters, key, {
                              get: () => getter(this.$state)
                            })
                            return getters;
                          }, {});
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

  #setState (newState) {
    this.$state = { ...newState };
    Storage.set(this.#persistentKey, this.$state);
    this.#observing.forEach(component => component.$render());
  }
}