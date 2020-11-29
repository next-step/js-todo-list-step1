import todo from "./module/todo.js";
import filter from "./module/filter.js";

const $store = (() => {
  return {
    todo,
    filter,
  };
})();

export default $store;
