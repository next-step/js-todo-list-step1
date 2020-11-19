import { addClassName, removeClassName } from "./utils.js";
import { onChangeFilter } from "./store.js";

const filters = {
  "#": document.getElementById("show-all"),
  "#active": document.getElementById("show-active"),
  "#completed": document.getElementById("show-completed"),
};
const SELECTED = "selected";

const getSelected = (hash) => filters[hash] || filters["#"];

const resetFilter = () =>
  R.pipe(R.values, R.forEach(removeClassName(SELECTED)))(filters);

const setSelectedFilter = R.pipe(getSelected, addClassName(SELECTED));

const changeFilter = () => {
  resetFilter();
  setSelectedFilter(document.location.hash);
  onChangeFilter();
};

export const initFilter = () => {
  changeFilter();
  window.onpopstate = () => {
    changeFilter();
  };
};
