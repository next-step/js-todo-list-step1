import { buildViewState } from "../utils/helpers.js";
import { $, isInClassList } from "../utils/selectors.js";

export default class TodoList {
  constructor(store, $app) {
    this.store = store;
    this.$app = $app;
    this.mount();
  }
  mount() {
    this.$app.addEventListener("click", (e) => {
      const isAll = isInClassList("all", e.target);
      const isActive = isInClassList("active", e.target);
      const isCompleted = isInClassList("completed", e.target);
      const hash = e.target.hash ? e.target.hash.substring(1) : "all";
      if (isAll || isActive || isCompleted) {
        buildViewState(hash, this.store, e);
      }
    });
  }
  render() {}
}
